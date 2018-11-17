const debug = require('debug')('PlazaStore');
const StoreBase = require('./base');
const PlazaSocket = require('../websocket/plazaSocket');

const {
    getCMDClientLoginPlaza,
} = require('../gamecore');
const {
    CLIENT_LOGIN_PLAZA_R,
    GET_PLAZA_ROOM_STATUS_R,
} = require('../common/gamecore');
const {
    LoginPlazaResp,
    GetPlazaRoomStatusResp,
} = require('../common/response');

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
        debug(`recieve socket data: cmd: ${packet.responseId}`)
        switch (packet.responseId) {
            case CLIENT_LOGIN_PLAZA_R:
                this.handleLoginPlazaResp(packet)
                break;
            case GET_PLAZA_ROOM_STATUS_R:
                this.handleGetPlazaRoomStatusResp(packet)
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
}

module.exports = PlazaStore;