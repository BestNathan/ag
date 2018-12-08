const debug = require('debug')('BacSocket');
const WebsocketBase = require('./base');
const config = require('../config');

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
    VIDEO_STATUS_INFO_R,
    VIDEO_REALTIME_INFO_EXT_R,
    GAME_START_R,
    GAME_PAYOUT_OTHER_R,
    GAME_JETTON_R,
    GAME_JETTON_EXT_R,
    DEAL_CARD_LIST_R,
    BAC_GAME_RESULT_EXT_R,
    GAME_CURRENT_STATUS_R,
} = require('../common/gamecore');
const {
    LoginGameExtResp,
    AutoEnterTableVidResp,
    VideoRealtimeInfoResp,
    VideoStatusInfoResp,
    VideoRealtimeInfoExtResp,
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
} = require('../common/response');

class BacSocket extends WebsocketBase {
    constructor(){
        super()
        debug('new bac socket')
    }
    get tag() {
        return 'bacSocket'
    }
    get url() {
        return `ws://${config.websocketUrl}:${config.bacClientLoginPort}`
    }
    get respMap() {
        if (this._respMap) {
            return this._respMap
        }

        this._respMap = new Map()
        const map = this._respMap;
        map.set(CLIENT_LOGIN_GAME_EXT_R, LoginGameExtResp);
        map.set(AUTO_ENTER_TABLE_EXT_R, AutoEnterTableVidResp);
        map.set(VIDEO_REALTIME_INFO_R, VideoRealtimeInfoResp);
        map.set(VIDEO_REALTIME_INFO_EXT_R, VideoRealtimeInfoExtResp);
        map.set(VIDEO_STATUS_INFO_R, VideoStatusInfoResp);
        map.set(GAME_START_R, GameStartResp);
        map.set(CRYPTO_BROADCAST_KEY_R, CryptoBroadcastKeyResp);
        map.set(CRYPTO_USER_KEY_R, CryptoUserKeyResp);
        map.set(GAME_PAYOUT_OTHER_R, GamePayoutOtherResp);
        map.set(GAME_JETTON_R, GameJettonResp);
        map.set(GAME_JETTON_EXT_R, GameJettonExtResp);
        map.set(CRYPTO_USER_SR, CryptoUserResp);
        map.set(CRYPTO_BROADCAST_R, CryptoBrodcastResp);
        map.set(DEAL_CARD_LIST_R, DealCardListResp);
        map.set(BAC_GAME_RESULT_EXT_R, BacGameResultExtResp);
        map.set(GAME_CURRENT_STATUS_R, GameCurrentStatusResp);

        return this._respMap;
    }
}

module.exports = BacSocket;