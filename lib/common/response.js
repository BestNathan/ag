const debug = require('debug')('Response')
const chalk = require('chalk').default;
const config = require('../config');
const asm = require('../asm');
const respMap = require('./gamecoreMap');
const {
    NICKNAME_LENGTH,
    VID_LENGTH,
    TABLE_LENGTH,
    GAMECODE_LENGTH,
    LOGINNAME_LENGTH,
    CURRENCY_LENGTH,
} = require('../common/core');
const {
    trimStringBuffer,
} = require('../utils')

class ResponseBase {
    /**
     * @constructor
     * @param {Buffer} buf
     */
    constructor(buf) {
        this.data = buf
        this.offset = 0;
        this.responseId = this.data.readInt32BE(this.offset)
        this.offset += 4;

        this.dataLength = this.data.readInt32BE(this.offset)
        this.offset += 4;

        this.seqNo = this.data.readInt32BE(this.offset)
        this.offset += 4;

        debug(
            `receive data :: id: %s, data length: %s, possible key: %s`,
            chalk.red(this.responseId),
            chalk.red(this.dataLength),
            chalk.red(respMap.get(this.responseId) || 'unknownKey')
        )

        this.decodeData()
    }
}

class ClientLoginResp extends ResponseBase {
    /**
     * @constructor
     * @param {Buffer} buf
     */
    constructor(...args) {
        super(...args)
        debug('ClientLoginResp')
    }
    decodeData(){
        this.code = this.data.readInt32BE(this.offset);
        this.offset += 4;

        this.token = this.data.slice(this.offset, this.offset + 16);
        this.offset += 16;
    }
    get tokenString() {
        return this.token.toString('hex');
    }
}

class UnknownResp extends ResponseBase {
    constructor(buf) {
        super(buf)
        debug('UnknownResp')
    }
    decodeData() {
        const payload = this.data.slice(this.offset)
        const tryString = payload.toString()
        const tryHex = payload.toString('hex')
        const maybeKey = respMap.get(this.responseId) || 'unknownKey'
        debug(`unknownResp: cmd: ${this.responseId}, respKey: ${maybeKey}`)
        config.debugUnknownRespString && debug(`unknownResp: tryString: ${tryString}`)
        config.debugUnknownRespHex && debug(`unknownResp: tryHex: ${tryHex}`)
    }
}

class ClientInfoResp extends ResponseBase {
    constructor(buf) {
        super(buf)
        debug('ClientInfoResp')
    }
    decodeData() {
        // /** @type {boolean} */
        // this.mobileAcountExist = 0 != stream.readByte();
        // /** @type {boolean} */
        // this.gesturePwdExist = 0 != stream.readByte();
        // stream.position += 6;
        // this.account = stream.readDouble();
        // this.nickname = stream.readUTFBytes(val.ma).trim();
        // this.gender = stream.readByte();
        // this.gameConfig = stream.readInt();
        this.mobileAcountExist = 0 !== this.data.readInt8(this.offset);
        this.offset += 1;
        this.gesturePwdExist = 0 !== this.data.readInt8(this.offset);
        this.offset += 1;
        this.offset += 6;
        this.account = this.data.readDoubleBE(this.offset);
        this.offset += 8;
        this.nickname = trimStringBuffer(this.data.slice(this.offset, this.offset + NICKNAME_LENGTH)).toString().trim();
        this.offset += NICKNAME_LENGTH;
        this.gender = this.data.readInt8(this.offset);
        this.offset += 1;
        this.gameConfig = this.data.readInt32BE(this.offset);
        this.offset += 4;
    }
}

class LoginPlazaResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        // (this.retCode = t.readInt()),
        // (this.displayGuild = 1 == t.readUnsignedByte());
        this.retCode = this.data.readInt32BE(this.offset);
        this.offset += 4;
        this.displayGuid = 1 === this.data.readUInt8(this.offset);
        this.offset += 1;
    }
}

class GetPlazaRoomStatusResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        // (this.roomCount = t.readInt()),
        // (this.roomStatusMap = new Core.HashMap());
        // for (var e, i = 0; i < this.roomCount; i++)
        // (e = new r.RoomStatus()),
        // (e.vid = t.readUTFBytes(Core._n)),
        // (e.status = t.readInt()),
        // (e.startTime = t.readInt() << (4 + t.readInt())),
        // this.roomStatusMap.set(e.vid, e);
        this.roomCount = this.data.readInt32BE(this.offset);
        this.offset += 4;
        this.roomStatusMap = new Map();
        for (const _ of new Array(this.roomCount)) {
            const vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
            this.offset += VID_LENGTH;
            const status = this.data.readInt32BE(this.offset);
            this.offset += 4;
            const offset = this.data.readInt32BE(this.offset);
            this.offset += 4;
            const startTime32 = this.data.readInt32BE(this.offset);
            this.offset += 4;
            const startTime = startTime32
            this.roomStatusMap.set(vid, {
                vid,
                status,
                startTime,
            })
        }
    }
}

class VideoRealtimeInfoExtResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData() {
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.gmtype = t.readUTFBytes(4)),
        // (this.total_join_player = t.readUnsignedShort()),
        // (this.total_bet_player = t.readUnsignedShort()),
        // (this.total_sit_player = t.readUnsignedShort()),
        // (this.n_reserve_1 = t.readUnsignedShort()),
        // (this.n_reserve_2 = t.readUnsignedShort()),
        // (this.total_balance = t.readDouble()),
        // (this.u_count = t.readByte()),
        // (this.betInfos = []),
        // (this.betInfoMap = new Core.HashMap());
        // for (var e = 0; e < this.u_count; e++) {
        //     var i = t.readUnsignedShort(),
        //         r = t.readUnsignedShort(),
        //         s = t.readDouble(),
        //         n = {
        //             playtype: i,
        //             total_player: r,
        //             total_jetton_cny: o.convertToMyCurrency(s)
        //         };
        //     this.betInfos.push(n), this.betInfoMap.set(i, n);
        // }
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.gmtype = trimStringBuffer(this.data.slice(this.offset, this.offset + 4)).toString();
        this.offset += 4;
        this.totalJoinPlayer = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        this.totalBetPlayer = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        this.totalSitPlayer = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        this.reserve1 = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        this.reserve2 = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        this.totalBalance = this.data.readDoubleBE(this.offset);
        this.offset += 8;
        this.uCount = this.data.readInt8(this.offset);
        this.offset += 1;
        this.betInfos = [];
        this.betInfoMap = new Map();
        for (const _ of new Array(this.uCount)) {
            const playtype = this.data.readUInt16BE(this.offset);
            this.offset += 2;
            const totalPlayer = this.data.readUInt16BE(this.offset);
            this.offset += 2;
            const money = this.data.readDoubleBE(this.offset);
            this.offset += 8;
            const obj = {
                playtype,
                totalPlayer,
                money,
            }
            this.betInfos.push(obj);
            this.betInfoMap.set(playtype, obj)
        }
    }
}

class LoginGameExtResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData() {
        // (this.retCode = t.readUnsignedInt()),
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.deviceType = t.readByte()),
        // (this.reserve1 = t.readByte()),
        // (this.reserve2 = t.readByte());
        this.retCode = this.data.readUInt32BE(this.offset);
        this.offset += 4;
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH);
        this.offset += 4;
        this.deviceType = this.data.readInt8(this.offset);
        this.offset += 1;
        this.reserve1 = this.data.readInt8(this.offset);
        this.offset += 1;
        this.reserve2 = this.data.readInt8(this.offset);
        this.offset += 1;
    }
}

class ClientEnterTableResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData() {
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.code = t.readInt()),
        // (this.table = t.readUTFBytes(Core.va)),
        // (this.seat = t.readByte());
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.code = this.data.readInt32BE(this.offset);
        this.offset += 4;
        this.table = this.data.slice(this.offset, this.offset + TABLE_LENGTH).toString();
        this.offset += TABLE_LENGTH;
        this.seat = this.data.readInt8(this.offset);
        this.offset += 1;
    }
}

class AutoEnterTableVidResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        // (this.code = t.readInt()),
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.table = t.readUTFBytes(Core.va)),
        // (this.seat = t.readByte());
        this.code = this.data.readInt32BE(this.offset);
        this.offset += 4;
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.table = this.data.slice(this.offset, this.offset + TABLE_LENGTH).toString();
        this.offset += TABLE_LENGTH;
        this.seat = this.data.readInt8(this.offset);
        this.offset += 1;
    }
}

class VideoRealtimeInfoResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.num = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.bet = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n1 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n2 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.credit1 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.credit2 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.n3 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n4 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n5 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n6 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n7 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.credit3 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.credit4 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.credit5 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.credit6 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.credit7 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.sumAmount = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.n8 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.n9 = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.credit8 = this.data.readFloatBE(this.offset);
        this.offset += 4;
        this.credit9 = this.data.readFloatBE(this.offset);
        this.offset += 4;
    }
}

class VideoStatusInfoResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        // this.vid = t.readUTFBytes(Core._n);
        // var e = i.RoomConfig.instance.getRoomInfoByVid(this.vid);
        // e &&
        //     ((this.status = t.readByte()),
        //     (this.timeout = t.readShort()),
        //     (this.max_timeout = t.readShort()),
        //     (this.last_res = t.readByte()),
        //     [i.GAME_BJ].indexOf(e.gmtype) > -1 &&
        //         (this.curHandIndex = t.readByte()));
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.status = this.data.readInt8(this.offset);
        this.offset += 1;
        this.timeout = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.maxTimeout = this.data.readInt16BE(this.offset);
        this.offset += 2;
        this.lastRes = this.data.readInt8(this.offset);
        this.offset += 1;
    }
}

class GameStartResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        this.gmcode = trimStringBuffer(this.data.slice(this.offset, this.offset + GAMECODE_LENGTH)).toString();
        this.offset += GAMECODE_LENGTH;
        this.span = this.data.readUInt16BE(this.offset);
        this.offset += 2;
    }
}

class CryptoBroadcastKeyResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        this.decryptKey = this.data.slice(this.offset, this.offset + 4).readInt32BE();
        this.offset += 4;
    }
}

class CryptoUserKeyResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        this.type = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.cryptoKey = this.data.slice(this.offset, this.offset + 4).readInt32BE();
        this.offset += 4;
    }
}

class GamePayoutOtherResp extends ResponseBase {
    constructor(buf) {
        super(buf)
    }
    decodeData() {
        this.loginName = trimStringBuffer(this.data.slice(this.offset, this.offset + LOGINNAME_LENGTH)).toString();
        this.offset += LOGINNAME_LENGTH;
        this.currency = trimStringBuffer(this.data.slice(this.offset, this.offset + CURRENCY_LENGTH)).toString();
        this.offset += CURRENCY_LENGTH;
        this.credit = this.data.readDoubleBE(this.offset);
        this.offset += 8;
        this.ptPayouts = [];
        this.betNum = this.data.readUInt8(this.offset);
        this.offset += 1;
        for (let index = 0; index < this.betNum; index++) {
            const playtype = this.data.readUInt8(this.offset);
            this.offset += 1;
            const value = this.data.readDoubleBE(this.offset);
            this.offset += 8;
            this.ptPayouts.push({
                playtype,
                value,
            })
        }
    }
}

class CryptoUserResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData(key) {
        if (!key) {
            return;
        }

        this.encData = asm.DecryptUser(this.data, key);
    }
}

class CryptoBrodcastResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData(key) {
        if (!key) {
            return;
        }

        this.encData = asm.DecryptBroadcast(this.data, key);
    }
}

class GameJettonResp extends ResponseBase {
    constructor(...args) {
        super(...args)
    }
    decodeData() {
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.name = t.readUTFBytes(Core.la)),
        // (this.nick = t.readUTFBytes(Core.ma)),
        // (this.tableCode = t.readUTFBytes(Core.va)),
        // (this.seatNum = t.readByte()),
        // (this.playType = t.readUnsignedByte()),
        // (this.value = t.readInt()),
        // (this.left = t.readDouble()),
        // (this.currency = t.readUTFBytes(Core.Fa));
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.name = trimStringBuffer(this.data.slice(this.offset, this.offset + LOGINNAME_LENGTH)).toString();
        this.offset += LOGINNAME_LENGTH;
        this.nickname = trimStringBuffer(this.data.slice(this.offset, this.offset + NICKNAME_LENGTH)).toString();
        this.offset += NICKNAME_LENGTH;
        this.tableCode = trimStringBuffer(this.data.slice(this.offset, this.offset + TABLE_LENGTH)).toString();
        this.offset += TABLE_LENGTH;
        this.seatNum = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.playtype = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.value = this.data.readInt32BE(this.offset);
        this.offset += 4;
        this.left = this.data.readDoubleBE(this.offset);
        this.offset += 8;
        this.currency = trimStringBuffer(this.data.slice(this.offset, this.offset + CURRENCY_LENGTH)).toString();
        this.offset += CURRENCY_LENGTH;
    }
}

class GameJettonExtResp extends ResponseBase {
    constructor(...args) {
        super(...args)
    }
    decodeData() {
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.name = t.readUTFBytes(Core.la)),
        // (this.nick = t.readUTFBytes(Core.ma)),
        // (this.tableCode = t.readUTFBytes(Core.va)),
        // (this.tableCode = i.TableSeatStore.instance.tableCode),
        // (this.seatNum = t.readByte()),
        // (this.seatNum = r.getBJValidSeatNum(this.seatNum)),
        // (this.playType = t.readUnsignedByte()),
        // (this.betSeatNum = t.readByte()),
        // (this.value = t.readDouble()),
        // (this.left = t.readDouble()),
        // (this.currency = t.readUTFBytes(Core.Fa));
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.name = trimStringBuffer(this.data.slice(this.offset, this.offset + LOGINNAME_LENGTH)).toString();
        this.offset += LOGINNAME_LENGTH;
        this.nickname = trimStringBuffer(this.data.slice(this.offset, this.offset + NICKNAME_LENGTH)).toString();
        this.offset += NICKNAME_LENGTH;
        this.tableCode = trimStringBuffer(this.data.slice(this.offset, this.offset + TABLE_LENGTH)).toString();
        this.offset += TABLE_LENGTH;
        this.seatNum = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.playtype = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.betSeatNum = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.value = this.data.readDoubleBE(this.offset);
        this.offset += 8;
        this.left = this.data.readDoubleBE(this.offset);
        this.offset += 8;
        this.currency = trimStringBuffer(this.data.slice(this.offset, this.offset + CURRENCY_LENGTH)).toString();
        this.offset += CURRENCY_LENGTH;
    }
}

class DealCardListResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData() {
        // (this.code = t.readUTFBytes(Core.Pn)),
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.card = t.readByte()),
        // (this.index = t.readByte()),
        // (this.who = t.readByte()),
        // (this.bankerCardList = []);
        // for (var e = 0; 3 > e; e++) {
        //     var i = t.readUnsignedByte();
        //     this.bankerCardList.push(i);
        // }
        // this.playerCardList = [];
        // for (var e = 0; 3 > e; e++) {
        //     var i = t.readUnsignedByte();
        //     this.playerCardList.push(i);
        // }
        this.code = trimStringBuffer(this.data.slice(this.offset, this.offset + GAMECODE_LENGTH)).toString();
        this.offset += GAMECODE_LENGTH;
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.card = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.index = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.who = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.bankerCardList = [];
        this.playerCardList = [];
        for (let index = 0; index < 3; index++) {
            const card = this.data.readUInt8(this.offset);
            this.offset += 1;
            this.bankerCardList.push(card);
        }
        for (let index = 0; index < 3; index++) {
            const card = this.data.readUInt8(this.offset);
            this.offset += 1;
            this.playerCardList.push(card);
        }
    }
}

class BacGameResultExtResp extends ResponseBase {
    constructor(buf){
        super(buf)
    }
    decodeData() {
        // (this.vid = t.readUTFBytes(Core._n)),
        // (this.code = t.readUTFBytes(Core.Pn)),
        // (this.bval = t.readByte()),
        // (this.pval = t.readByte()),
        // (this.bankerCardList = []);
        // for (var e = 0; 3 > e; e++) {
        //     var i = t.readUnsignedByte();
        //     this.bankerCardList.push(i);
        // }
        // this.playerCardList = [];
        // for (var e = 0; 3 > e; e++) {
        //     var i = t.readUnsignedByte();
        //     this.playerCardList.push(i);
        // }
        // this.overallRes = t.readUnsignedShort();
        this.vid = this.data.slice(this.offset, this.offset + VID_LENGTH).toString();
        this.offset += VID_LENGTH;
        this.code = trimStringBuffer(this.data.slice(this.offset, this.offset + GAMECODE_LENGTH)).toString();
        this.offset += GAMECODE_LENGTH;
        this.bval = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.pval = this.data.readUInt8(this.offset);
        this.offset += 1;
        this.bankerCardList = [];
        this.playerCardList = [];
        for (let index = 0; index < 3; index++) {
            const card = this.data.readUInt8(this.offset);
            this.offset += 1;
            this.bankerCardList.push(card);
        }
        for (let index = 0; index < 3; index++) {
            const card = this.data.readUInt8(this.offset);
            this.offset += 1;
            this.playerCardList.push(card);
        }
        this.overallRes = this.data.readUInt8(this.offset);
        this.offset += 1;
    }
}

module.exports = {
    ClientLoginResp,
    UnknownResp,
    ClientInfoResp,
    LoginPlazaResp,
    GetPlazaRoomStatusResp,
    VideoRealtimeInfoExtResp,
    LoginGameExtResp,
    ClientEnterTableResp,
    AutoEnterTableVidResp,
    VideoRealtimeInfoResp,
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
}