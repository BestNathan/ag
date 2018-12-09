const plazaService = require('./lib/service/plaza');
const bacService = require('./lib/service/bac');
const config = require('./lib/config');

const {
    HUB_GAME_BEGIN
} = require('./lib/common/events');

~async function main() {
    await config.load();
    const vid = 'C001';
    const userName = 'a308719298';
    const password = 'bd6277f1f882fae28ecf9463441ef66f';

    const plaza = await plazaService.plazaLogin(userName, password);
    plaza.on(HUB_GAME_BEGIN, function onGameBegin(v) {
        console.log(`vid: ${v} is begin to bet`);
    })
}()