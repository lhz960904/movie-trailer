import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getState from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: getState(),
  getters,
  mutations,
  actions,
  plugins: debug ? [createLogger()] : []
})
