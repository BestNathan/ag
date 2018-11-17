const debug = require('debug')('WebsocketPacket');
const NativeWebsocket = require('./native');
const {
    SOCKET_CLOSE,
    SOCKET_CONNECT,
    SOCKET_DATA,
    SOCKET_ERROR,
    CONNECTION_SICK,
    CONNECTION_PACKET,
    CONNECTION_RECOVER,
} = require('../common/events');
const {
    getCMDKeepAlive,
    getCMDUCGateAlive,
} = require('../core');
const {
    steelInt,
} = require('../utils');
const {
    UnknownResp,
} = require('../common/response');

const HEARTBEAT_INTERVAL = Symbol('websocketPacket#heartbeatInterval')
const HEARTBEAT_TIMER = Symbol('websocket#heartbeatTimer')
const HEARTBEAT_GATE_INTERVAL = Symbol('websocketPacket#heartbeatGateInterval')
const HEARTBEAT_GATE_COUNT = Symbol('websocketPacket#heartbeatGateCount')
const HEARTBEAT_GATE_TIMER = Symbol('websocketPacket#heartbeatGateTimer')
const TAG = Symbol('websocketPacket#tag')
const RESP_MAP = Symbol('websocketPacket#respMap')
const DEBUG = Symbol('websocketPacket#debug')
const SICK_FLAG = Symbol('websocketPacket#sickFlag')
const BUFFER = Symbol('websocketPacket#buffer')

/**
 * @param {Buffer} packet
 */
function checkPacketValid(packet) {
    if (packet.length < 12) {
        return false
    }
    const dataLength = steelInt(packet, 4)
    return dataLength === packet.length
}

class WebsocketPacket extends NativeWebsocket {
    /**
     * @constructor
     * @param {String} url
     * @param {String} tag
     * @param {Map} respMap
     */
    constructor(url, tag, respMap) {
        super(url)
        this[HEARTBEAT_INTERVAL] = 2e4;
        this[HEARTBEAT_GATE_INTERVAL] = 2e3;
        this[TAG] = tag;
        this[RESP_MAP] = respMap;
        this[SICK_FLAG] = false;
        this[BUFFER] = Buffer.alloc(0);

        this.on(SOCKET_CONNECT, this.onConnected.bind(this));
        this.on(SOCKET_CLOSE, this.onClosed.bind(this));
        this.on(SOCKET_ERROR, this.onIOError.bind(this));
        this.on(SOCKET_DATA, this.onReceiveData.bind(this));
    }
    /**
     * @param {Buffer} data
     */
    sendBytes(data) {
        if (this.connected) {
            this.writeBytes(data)
            const cmd = steelInt(data, 0)
            debug(`[${this[TAG]}] send data: cmd: ${cmd}, length: ${data.length}`)
        }
    }
    onConnected() {
        debug(`[${this[TAG]}] connected`)
        this[HEARTBEAT_TIMER] = setInterval(() => {
            debug(`[${this[TAG]}] heartbeat`)
            const keepAliveBuf = getCMDKeepAlive();
            this.writeBytes(keepAliveBuf)
        }, this[HEARTBEAT_INTERVAL])

        this[HEARTBEAT_GATE_COUNT] = 0;
        this[HEARTBEAT_GATE_TIMER] = setInterval(() => {
            debug(`[${this[TAG]}] sick check`)
            const count = this[HEARTBEAT_GATE_COUNT];
            if (count === 2) {
                debug(`[${this[TAG]}] is sick`)
                this[SICK_FLAG] = true;
                this.emit(CONNECTION_SICK)
            }

            if (count >= 3) {
                debug(`[${this[TAG]}] sick close`)
                this.close()
            } else {
                this[HEARTBEAT_GATE_COUNT]++
                if (this[HEARTBEAT_GATE_COUNT] >= 2) {
                    debug(`[${this[TAG]}] sick send gate alive cmd`)
                    const gateAliveBuf = getCMDUCGateAlive()
                    this.writeBytes(gateAliveBuf)
                }
            }
        }, this[HEARTBEAT_GATE_INTERVAL])
    }
    onClosed() {
        debug(`[${this[TAG]}] closed`)
        clearInterval(this[HEARTBEAT_GATE_TIMER])
        clearInterval(this[HEARTBEAT_TIMER])
    }
    onIOError(e) {
        debug(`[${this[TAG]}] error: ${e && e.message}`)
    }
    onReceiveData() {
        const newBuffer = this.readBytes()
        let data = Buffer.from(this[BUFFER]);
        data = Buffer.concat([data, newBuffer])
        while (data.length >= 12) {
            const dataLength = steelInt(data, 4)
            if (!dataLength || dataLength > data.length) {
                return;
            }

            const packetData = data.slice(0, dataLength);
            const packet = this.getPacketData(packetData)
            if (packet) {
                this.handlePacket(packet)
            }

            if (dataLength === data.length) {
                data = Buffer.alloc(0)
            } else {
                data = data.slice(dataLength)
            }
        }
        this[BUFFER] = data;
    }
    getPacketData(data) {
        const cmd = steelInt(data, 0)
        const length = steelInt(data, 4)
        debug(`[${this[TAG]}] recieve packet data: cmd: ${cmd}, length: ${length}`)
        return this.byteArrayToResponse(data)
    }
    handlePacket(packet) {
        this.emit(CONNECTION_PACKET, packet)
        this[HEARTBEAT_GATE_COUNT] = 0
        if (this[SICK_FLAG]) {
            this.emit(CONNECTION_RECOVER)
            this[SICK_FLAG] = false;
        }
    }
    byteArrayToResponse(data){
        if (checkPacketValid(data)) {
            const cmd = steelInt(data, 0);
            const ClassConstructor = this.getResponseClass(cmd);
            return new ClassConstructor(data);
        }

        return null
    }
    getResponseClass(cmd){
        const resp = this[RESP_MAP].get(cmd)
        if (resp) {
            return resp;
        }

        return UnknownResp;
    }
}

module.exports = WebsocketPacket