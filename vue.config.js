const path = require('path');

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  },
  css: {
    loaderOptions: {
      stylus: {

      }
    }
  }
}
