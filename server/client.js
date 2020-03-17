const http = require('http')
const util = require('util')
http.get('http://cp-tools.cn/geo/city', (res) => {
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    })
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData)
            console.log(parsedData);
            // console.log(util.inspect(parsedData))
        } catch (err) {
            console.error(err.message);
        }
    })
})