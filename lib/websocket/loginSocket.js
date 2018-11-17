const debug = require('debug')('LoginSocket');
const WebsocketBase = require('./base');
const config = require('../config');
const {
    ClientLoginResp,
    ClientInfoResp,
} = require('../common/response');
const {
    CLIENT_LOGIN_R,
    CLIENT_INFO_R,
} = require('../core/protocal')

class LoginSocket extends WebsocketBase {
    constructor(){
        super()
        debug('new login socket')
    }
    get tag() {
        // debug('get tag')
        return 'LoginSocket'
    }
    get url() {
        // debug('get url')
        return `ws://${config.websocketUrl}:${config.clientLoginPort}/`
    }
    get respMap() {
        // debug('get map')
        if (this._respMap) {
            return this._respMap
        }

        this._respMap = new Map()
        const map = this._respMap
        map.set(CLIENT_LOGIN_R, ClientLoginResp)
        map.set(CLIENT_INFO_R, ClientInfoResp)
        return this._respMap
    }
}

module.exports = LoginSocket;