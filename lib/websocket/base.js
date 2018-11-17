const Events = require('events');
const debug = require('debug')('WebsocketBase')
const WebsocketPacket = require('./packet');

const {
    SOCKET_CLOSE,
    SOCKET_CONNECT,
    SOCKET_ERROR,
    CONNECTION_SICK,
    CONNECTION_PACKET,
    CONNECTION_RECOVER,
} = require('../common/events');

const SETUP_SOCKET = Symbol('websocketBase#setupSocket')

class WebsocketBase extends Events {
    constructor() {
        super()
    }
    get connected (){
        return this.socket && this.socket.connected
    }
    close() {
        if (this.connected) {
            this.socket.close()
        }
    }
    connect() {
        debug(`will create socket with url: ${this.url}, tag: ${this.tag}, respMap: ${this.respMap && this.respMap.size}`)
        this.socket = new WebsocketPacket(this.url, this.tag, this.respMap)
        this[SETUP_SOCKET]()
        this.socket.connect(this.url);
    }
    [SETUP_SOCKET]() {
        this.socket.on(SOCKET_CLOSE, () => {
            debug('close')
            this.emit(SOCKET_CLOSE)
        })
        this.socket.on(SOCKET_ERROR, (e) => {
            debug('error: ' + e.message)
            this.emit(SOCKET_ERROR)
        })
        this.socket.on(SOCKET_CONNECT, () => {
            debug('connect')
            this.emit(SOCKET_CONNECT)
        })
        this.socket.on(CONNECTION_SICK, () => {
            debug('sick')
            this.emit(CONNECTION_SICK)
        })
        this.socket.on(CONNECTION_RECOVER, () => {
            debug('recover')
            this.emit(CONNECTION_RECOVER)
        })
        this.socket.on(CONNECTION_PACKET, (packet) => {
            debug('packet')
            this.emit(CONNECTION_PACKET, packet)
        })
    }
    sendData(data) {
        this.socket.sendBytes(data);
    }
}

module.exports = WebsocketBase;