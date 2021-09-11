/**
 * 系统层面的一些状态
 */
const state = {
  notification: { show: false, content: "", loading: false, level: "" },
  loading: { isLoading: false, progress: 0 },
  navDrawer: true,
  settingsDrawer: false
};

const mutations = {
  SET_NOTIFICATION: (state, payload) => {
    state.notification = { ...payload };
  },
  SET_LOADING: (state, loading) => {
    state.loading = { ...loading };
  },
  SET_NAV_DRAWER: (state, navDrawer) => {
    state.navDrawer = navDrawer;
  },
  SET_SETTINGS_DRAWER: (state, settingsDrawer) => {
    state.settingsDrawer = settingsDrawer;
  }
};

const actions = {
  dismissNotification: ({ commit }) => {
    commit("SET_NOTIFICATION", { show: false, content: "", loading: false });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
