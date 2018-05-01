import * as types from './mutation-types'
const mutations = {
  [types.SET_SEARCHHISTORY] (state, history) {
    state.searchHistory = history
  },
  [types.SET_USERINFO] (state, info) {
    state.user = info
  }
}

export default mutations
