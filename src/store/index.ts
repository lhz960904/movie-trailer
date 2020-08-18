import { createStore } from "vuex";
import searchCache from "@/assets/js/searchCache";

export default createStore({
  state: {
    searchHistory: searchCache.getAll()
  },
  mutations: {
    saveSearchHistory(state, query) {
      state.searchHistory = searchCache.addOne(query);
    },
    deleteSearchHistory(state, query) {
      state.searchHistory = searchCache.removeOne(query);
    },
    clearSearchHistory(state) {
      state.searchHistory = searchCache.clearAll();
    }
  },
  actions: {},
  modules: {}
});
