import * as types from './mutation-tyoes'
const mutations = {
  [types.SET_SEARCHHISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default mutations
