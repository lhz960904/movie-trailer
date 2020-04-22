import Vuex from "vuex";

export default Vuex.createStore({
  state: {
    user: {}
  },
  mutations: {
    setUserInfo(state, info) {
      state.user = info;
    }
  },
  actions: {
    setUserInfo({ commit }, info) {
      commit("setUserInfo", info);
    }
  },
  modules: {}
});
