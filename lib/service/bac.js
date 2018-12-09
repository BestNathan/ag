const debug = require('debug')('service:bac');
const bacStore = require('../store/bacStore');
const loginService = require('./login');

/**
 * @description 登陆到bac
 * @param {String} vid bac代码
 * @param {String} loginName 登录名
 * @param {Buffer} token token
 */
async function loginToBac(vid, loginName, token) {
    const bac = new bacStore(vid);
    return bac.startLogin(loginName, token);
}

/**
 * @description 登陆bac
 * @param {String} vid bac代码
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @returns {Promise<bacStore>}
 */
async function bacLogin(vid, userName, password) {
    let loginResult = await loginService.login(userName, password)
    let bac;

    try {
        debug('begin to login to bac. vid: %s, loginResult: %j', vid, loginResult)
        bac = await loginToBac(vid, loginResult.loginName, loginResult.token)
    } catch (error) {
        debug('first login to bac failed. error: ', error)
        loginService.deleteLogin(userName)
        loginResult = await loginService.login(userName, password)
        bac = await loginToBac(vid, loginResult.loginName, loginResult.token)
    }

    debug('bac login done...')
    return bac
}

module.exports = {
    bacLogin,
};
