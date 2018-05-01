import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch } from '@/common/js/cache'

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCHHISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCHHISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCHHISTORY, clearSearch(query))
}
