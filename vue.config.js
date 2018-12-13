const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    config.devServer.proxy({
      '/api': {
        target: 'http://127.0.0.1:4000'
      }
    })
  },
  css: {
    loaderOptions: {
      stylus: {
        import: ['~common/styles/mixin.styl']
      }
    }
  }
}
