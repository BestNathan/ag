const gamecore = require('./gamecore');
const core = require('../core/protocal');

const map = new Map()
for (const [key, value] of Object.entries(gamecore)) {
    map.set(value, key)
}
for (const [key, value] of Object.entries(core)) {
    map.set(value, key)
}

module.exports = map