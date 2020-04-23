import Vuex from "vuex";
import {
  getSearch,
  saveSearch,
  deleteSearch,
  clearSearch
} from "@/common/js/cache";

export default Vuex.createStore({
  state: {
    user: {},
    searchHistory: getSearch()
  },
  mutations: {
    setUserInfo(state, info) {
      state.user = info;
    },
    saveSearchHistory(state, query) {
      state.searchHistory = saveSearch(query);
    },
    deleteSearchHistory(state, query) {
      state.searchHistory = deleteSearch(query);
    },
    clearSearchHistory(state) {
      state.searchHistory = clearSearch();
    }
  },
  actions: {
    setUserInfo({ commit }, info) {
      commit("setUserInfo", info);
    }
  },
  modules: {}
});
