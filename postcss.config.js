module.exports = {
  plugins: {
    autoprefixer: {
      browsers: "last 2 versions"
    },
    "postcss-px-to-viewport": {
      unitToConvert: "px", //需要转换的单位，默认为"px"
      viewportWidth: 1599.99, // 视窗的宽度，对应设计稿的宽度
      viewportUnit: "rem", // 指定需要转换成的视窗单位，建议使用 rem
      fontViewportUnit: "rem", // 字体使用的视口单位
      // viewportWidth: 1599.96, // 视窗的宽度，对应设计稿的宽度
      // viewportUnit: 'rem', // 指定需要转换成的视窗单位，建议使用 rem
      // fontViewportUnit: 'rem', // 字体使用的视口单位
      unitPrecision: 13 // 指定`px`转换为视窗单位值的小数后 x位数
    }
  }
};
