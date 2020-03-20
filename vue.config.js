module.exports = {
    // 前端Server和接口代理
    devServer: {
        host: 'localhost',
        port: 9090,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}