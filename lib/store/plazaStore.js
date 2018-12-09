const debug = require('debug')('PlazaStore');
const StoreBase = require('./base');
const PlazaSocket = require('../websocket/plazaSocket');
const gamecoreMap = require('../common/gamecoreMap');

const {
    getCMDClientLoginPlaza,
} = require('../gamecore');
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
const {
    HUB_GAME_BEGIN,
} = require('../common/events');
const {
    GAMESTATUS,
} = require('../common/gamestatus');

class PlazaStore extends StoreBase {
    constructor(){
        super()
        this.socket = new PlazaSocket()
        this.setupSocket(this.socket);
    }
    checkLogin(){
        return this.loginPromise || Promise.reject(new Error('start login first'))
    }
    /**
     * @param {String} loginName
     * @param {Buffer} token
     * @returns {Promise<this>}
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
        const buf = getCMDClientLoginPlaza(this.loginName, this.token);
        this.socket.sendData(buf);
    }
    /**
     * @param {Object} packet
     * @param {Number} packet.responseId
     */
    onSocketData(packet) {
        const id = packet.responseId;
        debug(`recieve socket data: cmd: ${id}, key: ${gamecoreMap.get(id) || 'unknownKey'}`)
        switch (packet.responseId) {
            case CLIENT_LOGIN_PLAZA_R:
                this.handleLoginPlazaResp(packet)
                break;
            case GET_PLAZA_ROOM_STATUS_R:
                this.handleGetPlazaRoomStatusResp(packet)
                break;
            case VIDEO_STATUS_INFO_R:
                this.handleVideoStatusInfoResp(packet)
                break;
            default:
                break;
        }
    }
    /**
     * @param {LoginPlazaResp} packet
     */
    handleLoginPlazaResp(packet){
        debug('recieve login plaza resp')
        if (packet.retCode === 0) {
            this.loginResolve && this.loginResolve(this)
            debug('plaza login success')
        } else {
            this.loginReject && this.loginReject(new Error(`login fail, code: ${packet.retCode}`))
            debug(`plaza login fail code: ${packet.retCode}`)
        }
    }
    /**
     * @param {GetPlazaRoomStatusResp} packet
     */
    handleGetPlazaRoomStatusResp(packet) {
        debug('recieve plaza room status resp')
        // packet.roomStatusMap.forEach((value, key) => {
        //     console.log('room: ', key)
        //     console.log('roomData: ', JSON.stringify(value))
        // })
    }
    /**
     * @param {VideoStatusInfoResp} packet
     */
    handleVideoStatusInfoResp(packet) {
        debug('recieve Video Status Info Resp')
        const vid = packet.vid;
        const status = packet.status;
        debug('%s | status: %s', vid, status);
        if (status === GAMESTATUS.BETTING) {
            this.emit(HUB_GAME_BEGIN, vid);
        }
    }
}

module.exports = PlazaStore;