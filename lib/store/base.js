const Events = require('events');
const debug = require('debug')('StoreBase');
const {
    CONNECTION_PACKET,
    SOCKET_CONNECT,
    SOCKET_CLOSE,
    SOCKET_ERROR,
} = require('../common/events');

class StoreBase extends Events {
    constructor(){
        super()
    }
    /**
     * @param {Events} socket
     */
    setupSocket(socket) {
        debug('setup socket')
        this.onData = this.onData.bind(this)
        this.onConnected = this.onConnected.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onError = this.onError.bind(this)
        socket.on(CONNECTION_PACKET, this.onData)
        socket.on(SOCKET_CONNECT, this.onConnected)
        socket.on(SOCKET_CLOSE, this.onClose)
        socket.on(SOCKET_ERROR, this.onError)
    }
    /**
     * @param {Events} socket
     */
    removeSocket(socket) {
        debug('remove socket')
        socket.off(CONNECTION_PACKET, this.onData)
        socket.off(SOCKET_CONNECT, this.onConnected)
        socket.off(SOCKET_CLOSE, this.onClose)
        socket.off(SOCKET_ERROR, this.onError)
    }
    onData(packet) {
        this.onSocketData(packet)
    }
    onConnected() {
        this.onSocketConnected()
    }
    onClose(){
        this.emit(SOCKET_CLOSE)
    }
    onError(){
        this.emit(SOCKET_ERROR)
    }
    onSocketConnected(){
        throw new Error('`onSocketConnected` should be implemented')
    }
    onSocketData(){
        throw new Error('`onSocketData` should be implemented')
    }
}

module.exports = StoreBase;