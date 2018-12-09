const axios = require('axios').default;
const xml2js = require('xml2js');
const fs = require('fs');

axios.get('http://gci.epda866.com:81/agingame/resource/config/host_config.xml', {
    params: {
        timestamp: Date.now(),
        _count: 0,
    }
})
    .then(data => {
        fs.writeFileSync('./test.xml', data.data);
        xml2js.parseString(data.data, function callback (err, data) {
            fs.writeFileSync('./test.json', JSON.stringify(data))
        })
    })