const payloads = '7d5c7d7a96b2331ff3d75653f89f2e1bc6d36a2df0e2531dc9ed2f1ac6d34542af9c1d18e8cc4d48a4'
const key = '8055d33e'

const payloadBuf = Buffer.from(payloads, 'hex');
const keyBuf = Buffer.from(key, 'hex');

console.log(payloadBuf.length)

for (let index = 0; index < payloadBuf.length; index++) {
    const keyByteIndex = index % keyBuf.length
    payloadBuf[index] = payloadBuf[index] ^ keyBuf[keyByteIndex]
}

console.log(payloadBuf.readInt32BE())