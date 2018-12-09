const debug = require('debug')('PlazaSocket');
const WebsocketBase = require('./base');
const config = require('../config');

const {
    CLIENT_LOGIN_PLAZA_R,
    GET_PLAZA_ROOM_STATUS_R,
    VIDEO_STATUS_INFO_R,
} = require('../common/gamecore');
const {
    LoginPlazaResp,
    GetPlazaRoomStatusResp,
    VideoStatusInfoResp,
} = require('../common/response');

class PlazaSocket extends WebsocketBase {
    constructor(){
        super()
        debug('new plaza socket')
    }
    get tag() {
        return 'plazaSocket'
    }
    get url() {
        return `ws://${config.websocketUrl}:${config.getPort('plaza')}`
    }
    get respMap() {
        if (this._respMap) {
            return this._respMap
        }

        this._respMap = new Map()
        const map = this._respMap;
        map.set(CLIENT_LOGIN_PLAZA_R, LoginPlazaResp);
        map.set(GET_PLAZA_ROOM_STATUS_R, GetPlazaRoomStatusResp);
        map.set(VIDEO_STATUS_INFO_R, VideoStatusInfoResp);

        return this._respMap;
    }
}

module.exports = PlazaSocket;