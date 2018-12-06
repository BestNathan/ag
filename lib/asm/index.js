const y1h = require('./asm');
const {xor} = require('../utils');
const config = require('../config');

function Y7i(g0j) {
    for (var Z0j, f0j = 0; f0j < 5; f0j++) {
        if ((Z0j = y1h["_malloc"](g0j)) >= 0 && Z0j < y1h["HEAPU8"]["length"]) {
            return Z0j;
        }
        console["error"]("invalid malloc value: ", Z0j);
        y1h["_free"](Z0j);
    }
    return -1;
}

/**
 * 
 * @param {Buffer} buf 
 * @param {Number} key
 * @returns {Buffer}
 */
function Decrypt(buf, key) {
    buf = Buffer.from(buf);
    const len = buf.length;
    const ptr = Y7i(len + 4);
    const bytes = new Uint8Array(buf);
    y1h.HEAPU8.set(bytes, ptr);
    y1h._Process.apply(null, [0, ptr, len, 0, 0, key]);
    const res = y1h.HEAPU8.subarray(ptr, ptr + len);
    console.log(res)
    const resbuf = xor(Buffer.from(res).slice(12), config.decryptkey)
    console.log(new Uint8Array(resbuf))
    process.exit()
    return resbuf;
}

/**
 * 
 * @param {Buffer} buf data
 * @param {Number} key key
 */
function Encrypt(buf, key) {
    buf = Buffer.from(buf);
    
}

module.exports = {
    Decrypt,
    Encrypt,
}