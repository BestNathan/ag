const debug = require('debug')('BacStore');
const StoreBase = require('./base');
const BacSocket = require('../websocket/bacSocket');
const gamecoreMap = require('../common/gamecoreMap');

const {
    getCMDClientLoginGameExt,
    getCMDAutoEnterTable,
    getCMDGetGameCurrentStatus,
} = require('../gamecore');
const {
    CRYPTO_USER_KEY_R,
    CRYPTO_BROADCAST_KEY_R,
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
} = require('../common/response');

class BacStore extends StoreBase {
    constructor(vid){
        super()
        this.vid = vid;
        this.socket = new BacSocket();
        this.setupSocket(this.socket);
    }
    checkLogin(){
        return this.loginPromise || Promise.reject(new Error('start login first'))
    }
    /**
     * @param {String} loginName
     * @param {Buffer} token
     */
    startLogin(loginName, token) {
        debug(`start login: loginName: ${loginName}, token: ${token.toString('hex')}`)
        this.loginName = loginName;
        this.token = token;
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
            const buf = getCMDAutoEnterTable(this.vid);
            this.socket.sendData(buf);
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
            const buf = getCMDGetGameCurrentStatus()
            this.socket.sendData(buf);
        } else {
            debug(`enter table fail code: ${packet.code}`)
        }
    }
    /**
     * @param {VideoRealtimeInfoResp|VideoRealtimeInfoExtResp} packet
     */
    handleVideoRealtimeInfoResp(packet) {
        debug('recieve video realtime info resp')
        console.log(packet)
    }
    /**
     * @param {VideoStatusInfoResp} packet
     */
    handleVideoStatusInfoResp(packet) {
        debug('recieve video status info resp')
        console.log(packet)
    }
    /**
     * @param {GameStartResp} packet
     */
    handleGameStartResp(packet) {
        debug('recieve game start resp')
        console.log(packet)
    }
    /**
     * @param {CryptoBroadcastKeyResp} packet
     */
    handleCryptoBroadcastKeyResp(packet) {
        debug('recieve crypto broadcast key')
        console.log(packet)
    }
    /**
     * @param {CryptoUserKeyResp} packet
     */
    handleCryptoUserKeyResp(packet) {
        debug('recieve crypto user key')
        console.log(packet)
    }
    /**
     * @param {GamePayoutOtherResp} packet
     */
    handleGamePayoutOtherResp(packet) {
        debug('recieve Game Payout Other Resp')
        console.log(packet)
    }
    /**
     * @param {GameJettonResp|GameJettonExtResp} packet
     */
    handleGameJettonResp(packet) {
        debug('recieve Game Jetton Resp')
        console.log(packet)
    }
}

module.exports = BacStore;