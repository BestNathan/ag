const WebSocket = require('ws');

const ws = new WebSocket('ws://223.223.185.146:3000/');

ws.on('open', function open() {
    console.log('open')
    ws.send(Buffer.from('008600020000000C00000000', 'hex'))
    console.log(Buffer.from('008600020000000C00000000', 'hex').readInt32BE())
    const buf = Buffer.from('00040006', 'hex')
    console.log(buf.readInt32BE())
});

let flag = true
ws.on('message', function incoming(data) {
    console.log('data', data.readInt32BE());
    if (flag) {
        flag = false
        ws.send(Buffer.from('0004 0006 0000 003A 0000 0000 4E33 3161 3330 3837 3139 3239 3800 0000 0000 0000 0000 0000 0000 0000 0000 3152 EEAF 529F C786 02FF 0D3D EE03 CB0B'.replace(/ /g, ''), 'hex'))
    }
});

ws.on('close', function close() {
    console.log('close')
})