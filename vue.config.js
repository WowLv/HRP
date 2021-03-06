const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.1.105:3000",
        // target: "http://127.0.0.1:3000",
        // target: "https://www.lyuhz.top",
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
    //打包体积分析
    if (process.env.NODE_ENV === "production") {
      config.plugin("BundleAnalyzerPlugin").use(BundleAnalyzerPlugin);
    }
  }
};
