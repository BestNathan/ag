const {
    LOGINNAME_LENGTH,
    VID_LENGTH,
} = require('../common/core');
const {
    startCMD,
    endCMD,
    stringToBytes,
    getSimpleCMD,
} = require('../core/cmd');
const {
    CLIENT_LOGIN_PLAZA,
    CLIENT_LOGIN_GAME_EXT,
    AUTO_ENTER_TABLE,
    GET_GAME_CURRENT_STATUS,
} = require('../common/gamecore');

/**
 * @param {String} loginName
 * @param {Buffer} token
 */
function getCMDClientLoginPlaza(loginName, token) {
    let buf = startCMD(CLIENT_LOGIN_PLAZA);
    buf = Buffer.concat([buf, stringToBytes(loginName, LOGINNAME_LENGTH), token])
    return endCMD(buf);
}

/**
 * @param {String} vid
 * @param {String} loginName
 * @param {Buffer} token
 */
function getCMDClientLoginGameExt(vid, loginName, token) {
    const baseBuf = startCMD(CLIENT_LOGIN_GAME_EXT);
    const vidBuf = stringToBytes(vid, VID_LENGTH);
    const loginNameBuf = stringToBytes(loginName, LOGINNAME_LENGTH);
    const connectBuf = Buffer.from([5,0,0]);
    const buf = Buffer.concat([baseBuf, vidBuf, loginNameBuf, connectBuf, token]);
    return endCMD(buf);
}

/**
 * @param {String} vid
 */
function getCMDAutoEnterTable(vid) {
    const baseBuf = startCMD(AUTO_ENTER_TABLE);
    const vidBuf = stringToBytes(vid, VID_LENGTH);
    const buf = Buffer.concat([baseBuf, vidBuf]);
    return endCMD(buf);
}

function getCMDGetGameCurrentStatus() {
    return getSimpleCMD(GET_GAME_CURRENT_STATUS);
}

module.exports = {
    getCMDClientLoginPlaza,
    getCMDClientLoginGameExt,
    getCMDAutoEnterTable,
    getCMDGetGameCurrentStatus,
}