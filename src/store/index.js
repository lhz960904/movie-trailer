import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {
  getSearch,
  saveSearch,
  deleteSearch,
  clearSearch
} from 'common/js/cache'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    searchHistory: getSearch()
  },
  mutations: {
    saveSearchHistory (state, query) {
      state.searchHistory = saveSearch(query)
    },
    deleteSearchHistory (state, query) {
      state.searchHistory = deleteSearch(query)
    },
    clearSearchHistory (state) {
      state.searchHistory = clearSearch()
    }
  },
  plugins: debug ? [createLogger()] : []
})

Vue.use(Vuex)
