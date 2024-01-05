const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app){
    app.use(
        "/api" , 
        createProxyMiddleware({
            target : 'http://api.weatherstack.com', 
            changeOrigin : true , 
            pathRewrite :{
                '^api' :'', 
            },
        })
    )
}