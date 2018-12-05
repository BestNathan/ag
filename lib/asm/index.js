const y1h = require('./asm');
const {xor} = require('../utils');

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

const packet = [0, 4, 154, 16, 0, 0, 0, 53, 0, 0, 0, 251, 82, 105, 185, 206, 212, 29, 127, 220, 179, 162, 3, 250, 157, 168, 159, 255, 18, 156, 76, 81, 167, 88, 226, 144, 150, 165, 64, 195, 229, 83, 206, 123, 183, 75, 175, 83, 208, 199, 54, 37, 139]
// const ptr = Y7i(packet.length + 4);
// const bytes = new Uint8Array(packet)
// y1h.HEAPU8.set(bytes, ptr)
// // y1h.ccall('Process', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [2129399773, ptr, packet.length, 1042746311, 1179696122, 1549467686])
// y1h._Process.apply(null, [0, ptr, packet.length, 0, 0, 1549467686])

// const buffer = new ByteArray(new Uint8Array().buffer.slice(12))
// const key = new ByteArray(new Uint8Array().buffer)

// const res = new ByteArray()
// for (let index = 0; index < buffer.length; index++) {
//     key.position = index % key.length
//     res.writeByte(buffer.readByte() ^ key.readByte())
// }
console.log(xor(Decrypt(packet, 1549467686), [90, 191, 82, 114]).readUInt32BE());

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
    return Buffer.from(res).slice(12);
}

/**
 * 
 * @param {Buffer} buf data
 * @param {Number} key key
 */
function Encrypt(buf, key) {
    buf = Buffer.from(buf);
    
}