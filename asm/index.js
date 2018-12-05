const y1h = require('./src');
const {ByteArray} = require('../egret/byteArray');

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
const ptr = Y7i(packet.length + 4);
const bytes = new Uint8Array(packet)
y1h.HEAPU8.set(bytes, ptr)
// y1h.ccall('Process', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [2129399773, ptr, packet.length, 1042746311, 1179696122, 1549467686])
y1h._Process.apply(null, [0, ptr, packet.length, 1042746311, 1179696122, 1549467686])

const buffer = new ByteArray(new Uint8Array(y1h.HEAPU8.subarray(ptr, ptr + packet.length)).buffer.slice(12))
const key = new ByteArray(new Uint8Array([90, 191, 82, 114]).buffer)

const res = new ByteArray()
for (let index = 0; index < buffer.length; index++) {
    key.position = index % key.length
    res.writeByte(buffer.readByte() ^ key.readByte())
}

console.log(res);