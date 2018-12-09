const debug = require('debug')('service:plaza');
const plazaStore = require('../store/plazaStore');
const loginService = require('./login');

/**
 * @description 登陆到plaza
 * @param {String} loginName 登录名
 * @param {Buffer} token token
 */
async function loginToPlaza(loginName, token) {
    const plaza = new plazaStore();
    return plaza.startLogin(loginName, token);
}

/**
 * @description 登陆plaza
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @returns {Promise<plazaStore>}
 */
async function plazaLogin(userName, password) {
    let loginResult = await loginService.login(userName, password)
    let plaza;

    try {
        debug('begin to login to plaza. loginResult: %j', loginResult)
        plaza = await loginToPlaza(loginResult.loginName, loginResult.token)
    } catch (error) {
        debug('first login to plaza failed. error: ', error)
        loginService.deleteLogin(userName)
        loginResult = await loginService.login(userName, password)
        plaza = await loginToPlaza(loginResult.loginName, loginResult.token)
    }

    debug('plaza login done...')
    return plaza
}

module.exports = {
    plazaLogin,
};
