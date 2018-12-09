let configLoaded = false;

module.exports = {
    decryptkey: [90, 191, 82, 114],
    websocketUrl: '216.108.244.109',
    ports: {
        login: 5035,
        plaza: 3000,
        chat: 5030,
        road: 5075,
        game: {

        }
    },
    clientLoginPort: 5035,
    clientLoginPlazaPort: 3000,
    multiTableClientLoginPort: 5085,
    chatClientLoginPort: 3300,
    bacClientLoginPort: 5201,
    
    pid: 'N31',
    debugUnknownRespString: true,
    debugUnknownRespHex: true,
    load: function load() {
        if (configLoaded) {
            return this
        }

        return require('./load')().then(config => {
            Object.assign(this, config)
            configLoaded = true;
            return this
        });
    },
    getPort: function getPort(type) {
        if (['plaza', 'login', 'chat', 'road'].includes(type)) {
            return this.ports[type];
        }

        return this.ports.game[type] || -1
    }
}