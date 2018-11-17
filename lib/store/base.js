const Events = require('events');
const debug = require('debug')('StoreBase');
const {
    CONNECTION_PACKET,
    SOCKET_CONNECT,
} = require('../common/events');

class StoreBase {
    constructor(){

    }
    /**
     * @param {Events} socket
     */
    setupSocket(socket) {
        debug('setup socket')
        this.onData = this.onData.bind(this)
        this.onConnected = this.onConnected.bind(this)
        socket.on(CONNECTION_PACKET, this.onData)
        socket.on(SOCKET_CONNECT, this.onConnected)
    }
    /**
     * @param {Events} socket
     */
    removeSocket(socket) {
        debug('remove socket')
        socket.off(CONNECTION_PACKET, this.onData)
        socket.off(SOCKET_CONNECT, this.onConnected)
    }
    onData(packet) {
        this.onSocketData(packet)
    }
    onConnected() {
        this.onSocketConnected()
    }
    onSocketConnected(){}
    onSocketData(){}
}

module.exports = StoreBase;