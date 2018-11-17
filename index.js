const LoginStore = require('./lib/store/loginStore');
const PlazaStore = require('./lib/store/plazaStore');
const BacStore = require('./lib/store/bacStore');

~async function main() {
    const login = new LoginStore();
    const plaza = new PlazaStore();
    const bac = new BacStore('C001');

    const userName = 'a308719298';
    const password = 'bd6277f1f882fae28ecf9463441ef66f';

    const {loginName, token} = await login.startLogin(userName, password);
    // await plaza.startLogin(loginName, token);
    await bac.startLogin(loginName, token);
}()