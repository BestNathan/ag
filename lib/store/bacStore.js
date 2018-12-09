const debug = require('debug')('BacStore');
const StoreBase = require('./base');
const BacSocket = require('../websocket/bacSocket');
const gamecoreMap = require('../common/gamecoreMap');

const {
    getCMDClientLoginGameExt,
    getCMDAutoEnterTable,
    getCMDGetGameCurrentStatus,
    generateACKPacket,
    getCMDGameBetExt,
} = require('../gamecore');
const {
    CRYPTO_USER_KEY_R,
    CRYPTO_BROADCAST_KEY_R,
    CRYPTO_USER_SR,
    CRYPTO_BROADCAST_R,
} = require('../core/protocal');
const {
    CLIENT_LOGIN_GAME_EXT_R,
    AUTO_ENTER_TABLE_EXT_R,
    VIDEO_REALTIME_INFO_R,
    VIDEO_REALTIME_INFO_EXT_R,
    VIDEO_STATUS_INFO_R,
    GAME_START_R,
    GAME_PAYOUT_OTHER_R,
    GAME_JETTON_R,
    GAME_JETTON_EXT_R,
    DEAL_CARD_LIST_R,
    BAC_GAME_RESULT_EXT_R,
    GAME_CURRENT_STATUS_R,
    RESET_SHOECODE_R,
    GAME_BET_R,
    GAME_PAYOUT_ME_R,
} = require('../common/gamecore');
const {
    LoginGameExtResp,
    AutoEnterTableVidResp,
    VideoRealtimeInfoResp,
    VideoRealtimeInfoExtResp,
    VideoStatusInfoResp,
    GameStartResp,
    CryptoBroadcastKeyResp,
    CryptoUserKeyResp,
    GamePayoutOtherResp,
    GameJettonResp,
    GameJettonExtResp,
    CryptoUserResp,
    CryptoBrodcastResp,
    DealCardListResp,
    BacGameResultExtResp,
    GameCurrentStatusResp,
    RestShoecodeResp,
    GameBetResp,
    GamePayoutMeResp,
} = require('../common/response');
const {
    PLAYTYPES,
    PLAYTYPES_READABLE,
} = require('../common/playtype');
const {
    GAMESTATUS,
    GAMESTATUS_READABLE,
} = require('../common/gamestatus');
const getError = require('../common/error');
const {
    xor,
} = require('../utils');
const {
    Encrypt,
} = require('../asm');

class BacStore extends StoreBase {
    constructor(vid){
        super()
        this.vid = vid;
        this.socket = new BacSocket(vid);
        this.setupSocket(this.socket);

        this.gmcode = '';

        this.firstUserKey = true;
        this.userEncryptKey = 0;
        this.decryptBroadcastKey = 0;
        this.decryptUserKey = 0;

        this.round = 0;

        this.autoEnterInterval = 50000
        this.autoEnterTimer = null
    }
    checkLogin(){
        return this.loginPromise || Promise.reject(new Error('start login first'))
    }
    /**
     * @param {String} loginName
     * @param {Buffer} token
     */
    startLogin(loginName, token) {
        this.loginName = loginName;
        this.token = token;
        this.userEncryptKey = token.slice(-4).readUInt32BE();
        debug(`start login: loginName: ${loginName}, token: ${token.toString('hex')}, userEncryptKey: ${this.userEncryptKey}`)
        this.socket.connect();
        this.loginPromise = new Promise((resolve, reject) => {
            this.loginResolve = resolve;
            this.loginReject = reject;
        });
        return this.loginPromise;
    }
    onSocketConnected() {
        debug('connected')
        const buf = getCMDClientLoginGameExt(this.vid, this.loginName, this.token);
        this.socket.sendData(buf);
    }
    processData(data) {
        this.socket.processData(data);
    }
    enterTable() {
        this.autoEnterTimer && clearTimeout(this.autoEnterTimer);
        debug('send enter table: %s', this.vid)
        const buf = getCMDAutoEnterTable(this.vid);
        this.socket.sendData(buf);
        this.autoEnterTimer = setTimeout(() => {
            this.enterTable();
        }, this.autoEnterInterval);
    }
    bet(playtype, amount) {
        if (!this.gmcode) {
            return debug('not have any gmcode')
        }

        if (this.userEncryptKey === 0) {
            return debug('no user encrypt key')
        }

        const buf = getCMDGameBetExt(this.gmcode, playtype, amount);
        const encBuf = Encrypt(buf, this.userEncryptKey);
        this.socket.sendData(encBuf);
        debug('send bet data. playtype: %s, amount: %s', playtype, amount);
    }
    currentStatus() {
        const buf = getCMDGetGameCurrentStatus()
        this.socket.sendData(buf);
    }
    /**
     * @param {Object} packet
     * @param {Number} packet.responseId
     */
    onSocketData(packet) {
        const id = packet.responseId;
        debug(`recieve socket data: cmd: ${id}, key: ${gamecoreMap.get(id) || 'unknownKey'}`)
        switch (id) {
            case CLIENT_LOGIN_GAME_EXT_R:
                this.handleLoginGameExtResp(packet)
                break;
            case AUTO_ENTER_TABLE_EXT_R:
                this.handleAutoEnterTableVidResp(packet)
                break;
            case VIDEO_REALTIME_INFO_R:
            case VIDEO_REALTIME_INFO_EXT_R:
                this.handleVideoRealtimeInfoResp(packet)
                break;
            case VIDEO_STATUS_INFO_R:
                this.handleVideoStatusInfoResp(packet)
                break;
            case GAME_START_R:
                this.handleGameStartResp(packet)
                break;
            case CRYPTO_BROADCAST_KEY_R:
                this.handleCryptoBroadcastKeyResp(packet)
                break;
            case CRYPTO_USER_KEY_R:
                this.handleCryptoUserKeyResp(packet)
                break;
            case GAME_PAYOUT_OTHER_R:
                this.handleGamePayoutOtherResp(packet)
                break;
            case GAME_JETTON_R:
            case GAME_JETTON_EXT_R:
                this.handleGameJettonResp(packet)
                break;
            case CRYPTO_USER_SR:
                this.handleCryptoUserResp(packet)
                break;
            case CRYPTO_BROADCAST_R:
                this.handleCryptoBrodcastResp(packet)
                break;
            case DEAL_CARD_LIST_R:
                this.handleDealCardListResp(packet)
                break;
            case BAC_GAME_RESULT_EXT_R:
                this.handleBacGameResultExtResp(packet)
                break;
            case GAME_CURRENT_STATUS_R:
                this.handleGameCurrentStatusResp(packet)
                break;
            case RESET_SHOECODE_R:
                this.handleRestShoecodeResp(packet)
                break;
            case GAME_BET_R:
                this.handleGameBetResp(packet)
                break;
            case GAME_PAYOUT_ME_R:
                this.handleGamePayoutMeResp(packet)
                break;
            default:
                break;
        }
    }
    /**
     * @param {LoginGameExtResp} packet
     */
    handleLoginGameExtResp(packet){
        debug('recieve login bac resp')
        if (packet.retCode === 0) {
            this.loginResolve && this.loginResolve(this)
            debug('bac login success')
            this.enterTable()
        } else {
            this.loginReject && this.loginReject(new Error(`login fail, code: ${packet.retCode}`))
            debug(`bac login fail code: ${packet.retCode}`)
        }
    }
    /**
     * @param {AutoEnterTableVidResp} packet
     */
    handleAutoEnterTableVidResp(packet) {
        debug('recieve enter table resp')
        if (packet.code === 0 || packet.code === 23) {
            debug('enter table success')
            this.currentStatus()
        } else {
            debug(`enter table fail code: ${packet.code}`)
        }
    }
    /**
     * @param {VideoRealtimeInfoResp|VideoRealtimeInfoExtResp} packet
     */
    handleVideoRealtimeInfoResp(packet) {
        debug('recieve video realtime info resp')
        // console.log(packet)
    }
    /**
     * @param {VideoStatusInfoResp} packet
     */
    handleVideoStatusInfoResp(packet) {
        debug('recieve video status info resp')
        // console.log(packet)
    }
    /**
     * @param {GameStartResp} packet
     */
    handleGameStartResp(packet) {
        debug('recieve game start resp')
        this.gmcode = packet.gmcode;
        this.bet(PLAYTYPES.PLAYTYPE_BANKER, 10)
    }
    /**
     * @param {CryptoBroadcastKeyResp} packet
     */
    handleCryptoBroadcastKeyResp(packet) {
        debug('recieve crypto broadcast key: %s', packet.decryptKey)
        this.decryptBroadcastKey = packet.decryptKey;
    }
    /**
     * @param {CryptoUserKeyResp} packet
     */
    handleCryptoUserKeyResp(packet) {
        debug('recieve crypto user key: %s, type: %s', packet.cryptoKey, packet.type)
        if (packet.type === 1) {
            this.decryptUserKey = packet.cryptoKey;
        } else if (packet.type === 0) {
            let buf = '';
            if (!this.firstUserKey) {
                const newkey = packet.cryptoKey;
                const newBuf = Buffer.alloc(4);
                newBuf.writeInt32BE(newkey);
                const oldkey = this.userEncryptKey;
                const oldBuf = Buffer.alloc(4);
                oldBuf.writeInt32BE(oldkey);
                buf = generateACKPacket(xor(newBuf, oldBuf));
            } else {
                buf = generateACKPacket([0,0,0,0]);
                this.firstUserKey = false;
            }

            this.socket.sendData(buf);
            this.userEncryptKey = packet.cryptoKey;
        } else {
            console.error('unknown crypto key type');
        }
    }
    /**
     * @param {GamePayoutOtherResp} packet
     */
    handleGamePayoutOtherResp(packet) {
        debug('recieve Game Payout Other Resp')
        // console.log(packet)
    }
    /**
     * @param {GameJettonResp|GameJettonExtResp} packet
     */
    handleGameJettonResp(packet) {
        debug('recieve Game Jetton Resp')
        // console.log(packet)
    }
    /**
     * @description 处理加密的user数据
     * @param {CryptoUserResp} packet
     */
    handleCryptoUserResp(packet) {
        debug('recieve crypto user Resp')
        packet.decodeData(this.decryptUserKey);
        this.processData(packet.encData);
    }
    /**
     * @description 处理加密的广播数据
     * @param {CryptoBrodcastResp} packet
     */
    handleCryptoBrodcastResp(packet) {
        debug('recieve broadcast Resp')
        packet.decodeData(this.decryptBroadcastKey);
        this.processData(packet.encData);
    }
    /**
     * @param {DealCardListResp} packet
     */
    handleDealCardListResp(packet) {
        debug('recieve Deal Card List Resp')
        // console.log(packet)
    }
    /**
     * @param {BacGameResultExtResp} packet
     */
    handleBacGameResultExtResp(packet) {
        debug('recieve Bac Game Result Ext Resp')
        console.log(packet);
        const winTypes = packet.winTypes;
        console.log(winTypes.map(t => PLAYTYPES_READABLE[PLAYTYPES[t]]));
        // 防止被踢出房间
        this.enterTable();
    }
    /**
     * @param {GameCurrentStatusResp} packet
     */
    handleGameCurrentStatusResp(packet) {
        debug('recieve Game Current Status Resp')
        const status = packet.status;
        const statusString = GAMESTATUS[status];
        const statusReadable = GAMESTATUS_READABLE[statusString];
        debug('current game status: ', status, statusString, statusReadable);
    }
    /**
     * @param {RestShoecodeResp} packet
     */
    handleRestShoecodeResp(packet) {
        debug('recieve Rest Shoecode Resp')
    }
    /**
     * @param {GameBetResp} packet
     */
    handleGameBetResp(packet) {
        debug('recieve Game Bet Resp')
        if (packet.retCode === 0) {
            debug('bet success');
        } else {
            const errmsg = getError(packet.retCode);
            debug('bet fail: %s', errmsg);
        }
    }
    /**
     * @param {GamePayoutMeResp} packet
     */
    handleGamePayoutMeResp(packet) {
        debug('recieve Game Payout Me Resp')
        console.log(packet)
    }
}

module.exports = BacStore;