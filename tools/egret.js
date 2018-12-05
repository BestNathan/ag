const {ByteArray} = require('../egret/byteArray.js');


const key = new ByteArray(Buffer.from([73, 121, 94, 209]));
const data = new ByteArray(Buffer.from([90, 186, 242, 112]))
const res = new ByteArray()

key.position = 0;
data.position = 0;
for (let index = 0; index < data.length; index++) {
    key.position = index % key.length
    const byte = key.readByte() ^ data.readByte()
    res.writeByte(byte)
}
res.position = 0
const a = res.readUnsignedInt();
console.log(a);
console.log(new Uint8Array(res.data.buffer));
console.log(Buffer.from(res.data.buffer));

const b = b17(1232928467)
const buf = Buffer.alloc(8)
buf.writeInt32BE(b | 0)
console.log(new Uint8Array(buf));
console.log(buf);

function b17(k8j) {
    k8j = k8j | 0;
    return C67(k8j) | 0;
}
function C67(K8j) {
    K8j = K8j | 0;
    return j97(K8j | 0) | 0;
}
function O67() {}
function j97(T8j) {
    T8j = T8j | 0;
    return (T8j & 255) << 24 | (T8j >> 8 & 255) << 16 | (T8j >> 16 & 255) << 8 | T8j >>> 24 | 0;
}



const ee = [90,186,242,112,90,191,82,91,90,191,82,114,29,252,98,66,107,142,106,49,106,141,98,62,23,191,17,66,106,142,90,112,91,183,82,114,113,191,82,114,90]
const bb = [73,121,94,209,73,124,254,250,73,124,254,211,14,63,206,227,120,77,198,144,121,78,206,159,4,124,189,227,121,77,246,209,72,116,254,211,98,124,254,211,73]
const eeb = new ByteArray(Buffer.from(ee))
const bbb = new ByteArray(Buffer.from(bb))
eeb.position = 0
bbb.position = 0
const rrr = new ByteArray()
for (let index = 0; index < eeb.length; index++) {
    rrr.writeByte(eeb.readByte() ^ bbb.readByte())
}

console.log(Buffer.from(rrr.data.buffer));
// 