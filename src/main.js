import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import 'common/styles/common.styl'

fastClick.attach(document.body)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  error: require('./common/images/loading.png'),
  loading: require('./common/images/loading.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
