const debug = require('debug')('service:login');
const loginStore = require('../store/loginStore');

const loginMap = new Map();

/**
 * @description 登陆服务器获取登录名和token
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @returns {{loginName:String, token: Buffer}}
 */
async function login(userName, password) {
    if (loginMap.has(userName)) {
        debug('userName: %s, has been logined', userName)
        return loginMap.get(userName)
    }

    debug('begin to login. userName: %s, password: %s', userName, password)
    const login = new loginStore();
    const {loginName, token} = await login.startLogin(userName, password);
    const res = {
        loginName,
        token,
    }
    loginMap.set(loginName, res)
    return res;
}

function deleteLogin(userName) {
    if (loginMap.has(userName)) {
        debug('delete logined userName: %s', userName)
        loginMap.delete(userName)
    }
}

module.exports = {
    login,
    deleteLogin,
}