
/**
 * @param {Buffer} buf
 * @param {Number} offset
 */
function steelInt(buf, offset) {
    if (buf.length > offset + 4) {
        return buf.readInt32BE(offset);
    }

    return null;
}

/**
 * @param {Buffer} buf
 */
function trimStringBuffer(buf) {
    let index = 0;
    for (const byte of buf) {
        if (byte === 0) {
            break
        }
        index++
    }
    return buf.slice(0, index)
}

/**
 * 
 * @param {Buffer} buf 
 * @param {Buffer} key 
 */
function xor(buf, key) {
    buf = Buffer.from(buf);
    key = Buffer.from(key);
    const res = [];
    const keyLen = key.length
    let index = 0;
    for (const byte of buf) {
        const i = index % keyLen
        const keyByte = key.readUInt8(i)
        res.push(byte ^ keyByte);
        index++
    }
    return Buffer.from(res)
}

module.exports = {
    steelInt,
    trimStringBuffer,
    xor,
}