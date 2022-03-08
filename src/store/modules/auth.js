import { getPermissions, getUserInfo } from "@/api/auth";

const state = {
  permissions: [],
  signedInUser: "",
};

const mutations = {
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_SIGNED_IN_USER: (state, signedInUser) => {
    state.signedInUser = signedInUser;
  },
};

const actions = {
  setSignedInUser: async ({ commit }) => {
    // mockjs will be ready later than vuex
    // so when in dev environment, using sessionStorage to resume
    // info of signed-in user when refreshing
    let permissions, signedInUser;
    // if (process.env.NODE_ENV === "development") {
    //   permissions = JSON.parse(sessionStorage.getItem("va-permissions"));
    //   signedInUser = JSON.parse(sessionStorage.getItem("va-signed-in-user"));
    // } else {
    permissions = (await getPermissions()).result;
    signedInUser = (await getUserInfo()).result;
    // }

    commit("SET_PERMISSIONS", permissions);
    commit("SET_SIGNED_IN_USER", signedInUser);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
