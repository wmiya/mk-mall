const user = require('./user')
let http = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')
// 创建服务
let server = http.createServer((req, res) => {
    // 拿到请求文件路径
    let pathName = url.parse(req.url).pathname
    // 读取文件进行渲染
    fs.readFile(pathName.substring(1), (err, data) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data.toString())
        }
        res.end()
    })
})

server.listen(3000, '127.0.0.1', () => {
    console.log('服务已经起来了，打开看看吧，http://127.0.0.1:3000')
})