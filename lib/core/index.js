const {
    UCGATE_ALIVE,
    CLIENT_LOGIN,
    KEEP_ALIVE,
} = require('./protocal');
const {
    LOGINNAME_LENGTH,
} = require('../common/core');
const {
    getSimpleCMD,
    startCMD,
    endCMD,
    stringToBytes,
    hexStrToBytes,
} = require('./cmd');

function getCMDKeepAlive() {
    return getSimpleCMD(KEEP_ALIVE);
}

function getCMDUCGateAlive() {
    return getSimpleCMD(UCGATE_ALIVE);
}

// function connect(key, e) {
//     var writer = self.startCMD(self.Protocol.CLIENT_LOGIN);
//     writer.writeBytes(self.stringToBytes(key, self.la));
//     var data = self.hexStrToBytes(e);
//     return (
//         writer.writeBytes(data), writer.writeInt(0), self.endCMD(writer)
//     );
// }
/**
 * @param {String} loginName
 * @param {String} password
 */
function getCMDClientLogin(loginName, password) {
    const startBuf = startCMD(CLIENT_LOGIN);
    const loginNameBuffer = stringToBytes(loginName, LOGINNAME_LENGTH);
    const passwordBuffer = hexStrToBytes(password);
    const buf = Buffer.concat([startBuf, loginNameBuffer, passwordBuffer, Buffer.alloc(4).fill(0)]);
    return endCMD(buf);
}

module.exports = {
    getCMDUCGateAlive,
    getCMDClientLogin,
    getCMDKeepAlive,
}