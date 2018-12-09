const {
    CMD_MIN_LENGTH,
    CMD_DEFAULT_SEQ
} = require('../common/cmd');

function getSimpleCMD(cmd) {
    const buffer = Buffer.alloc(CMD_MIN_LENGTH);
    buffer.writeInt32BE(cmd);
    buffer.writeInt32BE(CMD_MIN_LENGTH, 4);
    buffer.writeInt32BE(CMD_DEFAULT_SEQ, 8);
    return buffer;
}

function startCMD(cmd, seq = 0) {
    const buffer = Buffer.alloc(CMD_MIN_LENGTH);
    buffer.writeInt32BE(cmd);
    buffer.writeInt32BE(0, 4);
    buffer.writeInt32BE(seq, 8);
    return buffer;
}

/**
 * @param {Buffer} buf
 */
function endCMD(buf) {
    const length = buf.length;
    buf.writeInt32BE(length, 4);
    return buf
}

function hexStrToBytes(str) {
    return Buffer.from(str, 'hex')
}

/**
 * @param {String} str 待转换字符串
 * @param {Number} len 返回长度 不足补0 超过截断
 */
function stringToBytes(str, len) {
    const buf = Buffer.from(str, 'utf8');
    const bufLen = buf.length;
    if (bufLen === len) {
        return buf
    } else if (bufLen < len) {
        return Buffer.concat([buf, Buffer.alloc(len - bufLen, 0)])
    } else {
        return buf.slice(0, len)
    }
}

module.exports = {
    getSimpleCMD,
    startCMD,
    endCMD,
    hexStrToBytes,
    stringToBytes,
}