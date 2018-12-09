const debug = require('debug')('LoginStore');
const StoreBase = require('./base');
const config = require('../config');
const getError = require('../common/error');
const LoginSocket = require('../websocket/loginSocket');
const {
    CLIENT_LOGIN_R,
    CLIENT_INFO_R,
} = require('../core/protocal');
const {
    getCMDClientLogin,
} = require('../core')
const {
    ClientLoginResp,
    ClientInfoResp,
} = require('../common/response');

class LoginStore extends StoreBase {
    constructor(){
        super()
        this.loginDone = false;
        this.socket = new LoginSocket();
        this.setupSocket(this.socket);
    }
    checkLogin(){
        if (this.loginDone) {
            return Promise.resolve(this);
        }
        return this.loginPromise || Promise.reject(new Error('invoke `startLogin` first'))
    }
    get loginName() {
        return config.pid + this.userName
    }
    /**
     * @returns {Promise<this>}
     */
    startLogin(userName, password) {
        debug(`start login: userName: ${userName}, passowrd: ${password}`);
        this.userName = userName;
        this.password = password;
        this.socket.connect();
        this.loginPromise = new Promise((resolve, reject) => {
            this.loginResolve = resolve;
            this.loginReject = reject;
        });
        return this.loginPromise;
    }
    checkNKillSocket() {
        if (this.socket.connected) {
            debug('kill')
            this.removeSocket(this.socket)
            this.socket.close()
        }
    }
    onSocketConnected() {
        debug('connected')
        const loginBuffer = getCMDClientLogin(this.loginName, this.password)
        this.socket.sendData(loginBuffer)
    }
    /**
     * @param {Object} packet
     * @param {Number} packet.responseId
     */
    onSocketData(packet) {
        debug(`recieve socket data: cmd: ${packet.responseId}`)
        switch (packet.responseId) {
            case CLIENT_LOGIN_R:
                this.handleClientLoginResp(packet)
                break;
            case CLIENT_INFO_R:
                this.handleClientInfoResp(packet)
                break;
            default:
                break;
        }
    }
    /**
     * @param {ClientLoginResp} packet
     */
    handleClientLoginResp(packet){
        debug('recieve client login resp')
        const code = packet.code;
        if (code !== 0) {
            const error = new Error();
            error.message = '登陆失败，原因：' + getError(code);
            error.code = code;
            error.name = 'loginError';
            this.loginReject && this.loginReject(error);
            return this.checkNKillSocket()
        }

        this.token = packet.token;
        this.tokenString = packet.tokenString;
        debug(`get token: ${this.tokenString}`)
    }
    /**
     * @param {ClientInfoResp} packet
     */
    handleClientInfoResp(packet) {
        debug('recieve client info resp')
        // /** @type {!Object} */
        // var body = message;
        // this.balance = body.account;
        // this.nickName = body.nickname;
        // /** @type {boolean} */
        // this.loginDone = true;
        // this.checkNKillSocket();
        // this.dispatchAction($scope.Wh);
        this.balance = packet.account;
        this.nickName = packet.nickname;
        this.loginDone = true;
        this.checkNKillSocket();
        this.loginResolve && this.loginResolve(this);
        debug(`get balance: ${this.balance}, nickName: ${this.nickName}`)
    }
}

module.exports = LoginStore;