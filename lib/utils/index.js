
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

module.exports = {
    steelInt,
    trimStringBuffer,
}