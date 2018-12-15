import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'common/js/axios'

import 'common/styles/reset.styl'

Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
