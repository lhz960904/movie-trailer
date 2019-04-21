const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const cdn = {
  css: [
    // dplayer
    '//cdn.bootcss.com/dplayer/1.25.0/DPlayer.min.css'
  ],
  js: [
    // vue
    '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
    // vue-router
    '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
    // vuex
    '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
    // axios
    '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
    // dplayer
    '//cdn.bootcss.com/dplayer/1.25.0/DPlayer.min.js'
  ]
}

const externals = {
  vue: 'Vue',
  axios: 'axios',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  dplayer: 'DPlayer'
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    config.devServer.proxy({
      '/api': {
        target: 'http://movie.ihaoze.cn/'
      }
    })
    config.externals(externals)
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
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
