module.exports = {
  devServer: {
    port: 11111,
    //配置代理解决跨域
    proxy: {
      //配置默认路径
      //访问时直接请求：'/api/***.json'
      "/api": {
        //代理的API地址，可以是域名或ip
        // target: "http://49.235.120.123:20000/sourse",
        target: "http://49.235.120.123:20001",
        //webSocket
        ws: true,
        //如果target是域名需配置为true
        changeOrigin: true,

        /*  
            路径重写，也就是说会修改最终请求的API路径。
            比如访问的API路径/api/data，
            设置pathRewrite: {'^/api' : ''},后，
            最终代理访问的路径为：http://localhost:20000/data
            这个参数的目的是给代理命名后，在访问时把命名删除掉。
         */
        pathRewrite: {
          "^/api": "/api",
        },
      },
      "/localhostApi": {
        target: "http://localhost:3000",
        // target: "http://49.235.120.123:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/localhostApi": "",
        },
      },
    },
  },
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  configureWebpack: {
    devtool: "source-map",
    // devtool: 'cheap-module-eval-source-map',
    mode: "development",
  },
};

//更多配置见:https://webpack.docschina.org/configuration/dev-server/#devserverproxy
