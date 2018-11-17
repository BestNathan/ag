const Websocket = require('ws');
const debug = require('debug')('NativeWebsocket');
const Events = require('events');

const {
    SOCKET_CLOSE,
    SOCKET_CONNECT,
    SOCKET_DATA,
    SOCKET_ERROR,
} = require('../common/events');

const BIND_EVENTS = Symbol('websocketBase#bindEvents')
const UNBIND_EVENTS = Symbol('websocketBase#UnbindEvents')
const READ_BUFFER = Symbol('websocket#readBuffer')
const WRITE_BUFFER = Symbol('websocket#writeBuffer')
const BYTES_WRITE = Symbol('websocket#bytesWrite')

function noop() {}

class NativeWebsocket extends Events {
    /**
     * @constructor
     * @param {String} url
     */
    constructor(url){
        super()
        this.url = url
        this[READ_BUFFER] = null;
        this[WRITE_BUFFER] = null;
        this.socket = null;
    }
    get connected (){
        return this.socket && this.socket.readyState === Websocket.OPEN
    }
    connect(url) {
        if (!this.socket || this.socket.readyState !== Websocket.CONNECTING || url !== this.socket.url) {
            debug('begin to setup websocket connection');
            if (this.socket) {
                debug('close former socket connection');
                this[UNBIND_EVENTS]()
                this.socket.close();
            }
            try {
                debug('try setup socket connection');
                this.url = url
                this.socket = new Websocket(url)
                this[BIND_EVENTS]()
            } catch (error) {
                debug(`setup socket connection error: ${error.message}`);
                setTimeout(() => {
                    debug('retry setup socket connection');
                    this.connect(url);
                }, 100);
            }
        }
    }
    close(){
        this.socket.close();
    }
    flush() {
        if (this.connected && this[BYTES_WRITE] && this[WRITE_BUFFER]) {
            debug(`>>>>> flushing data length: ${this[WRITE_BUFFER].length}`)
            this[BYTES_WRITE] = false
            this.socket.send(this[WRITE_BUFFER])
            this[WRITE_BUFFER] = null
        }
    }
    /**
     * @param {Buffer} buf
     */
    writeBytes(buf) {
        if (this.connected) {
            this[BYTES_WRITE] = true
            const buffer = Buffer.from(buf)
            if (Buffer.isBuffer(this[WRITE_BUFFER])) {
                this[WRITE_BUFFER] = Buffer.concat([this[WRITE_BUFFER], buffer])
            } else {
                this[WRITE_BUFFER] = buffer
            }
            this.flush()
        }
    }
    /**
     * @returns {Buffer}
     */
    readBytes() {
        if (this.connected && this[READ_BUFFER] && Buffer.isBuffer(this[READ_BUFFER])) {
            const buf = this[READ_BUFFER]
            this[READ_BUFFER] = null
            debug(`reading data length: ${buf.length}`)
            return buf
        }

        return Buffer.alloc(0)
    }
    [BIND_EVENTS](){
        debug('bind events');
        this.socket.on('open', () => {
            debug('open');
            this.onConnect && this.onConnect();
        })
        this.socket.on('error', (e) => {
            debug('error: ' + e.message);
            this.onError && this.onError(e);
        })
        this.socket.on('close', (...arg) => {
            debug('close');
            this.onClose && this.onClose(...arg);
        })
        this.socket.on('message', (data) => {
            debug('message');
            this.onSocketData && this.onSocketData(data);
        })
    }
    [UNBIND_EVENTS](){
        debug('unbind events');
        this.socket.onopen = noop;
        this.socket.onclose= noop;
        this.socket.onerror = noop;
        this.socket.onmessage = noop;
    }
    onConnect(){
        this.emit(SOCKET_CONNECT)
    }
    onError(e){
        this.emit(SOCKET_ERROR, e)
    }
    onClose(...arg){
        this.emit(SOCKET_CLOSE, ...arg)
    }
    onSocketData(data) {
        const buf = Buffer.from(data) 
        if (Buffer.isBuffer(this[READ_BUFFER])) {
            this[READ_BUFFER] = Buffer.concat([this[READ_BUFFER], buf])
        } else {
            this[READ_BUFFER] = buf
        }
        debug(`<<<<< recieve data: length: ${this[READ_BUFFER].length}`)
        this.emit(SOCKET_DATA)
    }

}

module.exports = NativeWebsocket