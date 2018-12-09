const axios = require('axios').default;
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const configUrl = 'http://gci.epda866.com:81/agingame/resource/config/host_config.xml';

function parseConfig(data) {
    const result = {}
    const config = data.config || {};
    const env = config.environment || [];
    if (!Array.isArray(env) || !env.length) {
        return result;
    }

    const environment = env[0];
    if (environment.$ && environment.$.name === 'PROD' && environment.$.domain) {
        result.websocketUrl = environment.$.domain;
    }

    const hosts = environment.host
    if (Array.isArray(hosts) && hosts.length) {
        hosts.forEach(hostConfig => {
            if (hostConfig.$) {
                // { "hostType": "login", "gameType": "", "platform": "", "port": "5035" }
                const {
                    // 类型
                    hostType,
                    // 端口
                    port,
                    // 对应的vid
                    vids,
                } = hostConfig.$

                if (hostType !== 'game') {
                    // 不是game类型则只需要port
                    if (!port) {
                        return;
                    }

                    result.ports = result.ports || {};
                    result.ports[hostType] = port;
                } else {
                    // game类型需要 port 和 vids
                    if (!port || !vids) {
                        return;
                    }

                    result.ports = result.ports || {};
                    result.ports.game = result.ports.game || {};
                    vids.split(' ').forEach(vid => {
                        result.ports.game[vid] = port;
                    })
                }
            }
        })
    }

    return result;
}

module.exports = function loadConfig () {
    return axios.get(configUrl)
        .then((result) => {
            const xmldata = result.data;
            fs.writeFileSync(path.join(__dirname, './loadConfig.xml'), xmldata)
            return new Promise((resolve, reject) => {
                xml2js.parseString(xmldata, function callback (err, result) {
                    if (!!err) {
                        return reject(err)
                    }

                    resolve(parseConfig(result))
                })
            });
        })
}