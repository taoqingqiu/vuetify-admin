import { getAuthorities } from "@/api/auth";

const state = {
  actions: null,
  username: "",
  menus: [],
};

const mutations = {
  SET_ACTIONS: (state, payload) => {
    state.actions = payload;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
};

const actions = {
  setUser: async ({ commit }, username) => {
    // 由于某种神秘原因，mockjs 在初始时响应不了 (404)
    // 因此 dev 环境时，刷新当前页面后恢复 vuex 用户状态采用 sessionStorage 方式
    // 而这将导致某些状态可能不是最新的
    if (process.env.NODE_ENV === "development") {
      const { menus, actions } = JSON.parse(
        sessionStorage.getItem("menus-actions")
      );
      commit("SET_ACTIONS", actions);
      commit("SET_MENUS", menus);
    } else {
      const { menus, actions } = (await getAuthorities()).data;
      commit("SET_ACTIONS", actions);
      commit("SET_MENUS", menus);
    }

    commit("SET_USERNAME", username);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
