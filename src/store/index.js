import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import createLogger from 'vuex/dist/logger'
import {
  getSearch,
  saveSearch,
  deleteSearch,
  clearSearch
} from 'common/js/cache'

const COOKIE_NAME = 'movie_trailer_user'
const getCookieUser = () => {
  return Cookie.get(COOKIE_NAME)
    ? JSON.parse(Cookie.get(COOKIE_NAME))
    : null
}

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    searchHistory: getSearch(),
    user: getCookieUser()
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
    },
    setUserInfo (state, info) {
      Cookie.set(COOKIE_NAME, info, { expires: 1 })
      state.user = info
    }
  },
  plugins: debug ? [createLogger()] : []
})

Vue.use(Vuex)
