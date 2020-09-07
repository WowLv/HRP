const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.1.104:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    //配置公共scss样式自动导入.vue中
    const resources = [
      "./src/assets/styles/index.scss",
      "./src/assets/styles/reset.scss"
    ];
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: resources.map(p => path.resolve(__dirname, p))
        })
        .end();
    });
  }
};
