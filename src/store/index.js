import Vuex from "vuex";

export default Vuex.createStore({
  state: {
    user: {
      email: "lihaozecq@gmail.com",
      username: "超强"
    }
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
