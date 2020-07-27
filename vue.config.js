module.exports = {
  chainWebpack: config => {
    config.devServer.proxy({
      "/api": {
        target: "http://47.110.74.37:7001/"
      }
    });
  },
  css: {
    loaderOptions: {
      stylus: {
        import: ["~@/assets/styles/mixin.styl"]
      }
    }
  }
};
