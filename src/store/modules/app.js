const state = {
  notification: { show: false, content: "", loading: false, level: "" },
  loading: { isLoading: false, progress: 0 },
  navDrawer: true,
  clipped: false,
  error: null,
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
  SET_CLIPPED: (state, payload) => {
    state.clipped = payload;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
