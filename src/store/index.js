import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 1
  },
  getters: {
    num: state => state.count
  },
  mutations: {
    increment: (state, { num }) => {
      state.count += num
    }
  },
  actions: {
    incrementAsync: ({ commit }, args) => {
      setTimeout(() => {
        commit('increment', args)
      }, 1000)
    }
  },
  plugins: [createLogger()]
})
