import store from "../store";

const notify = (content, loading = false, level = "info") => {
  store.commit("app/SET_NOTIFICATION", { show: true, loading, content, level });
};

export const notification = {
  success(content, loading = false) {
    notify(content, loading, "success");
  },
  warning(content, loading = false) {
    notify(content, loading, "warning");
  },
  error(content, loading = false) {
    notify(content, loading, "error");
  },
  info(content, loading = false) {
    notify(content, loading, "info");
  },
  dismiss() {
    store.dispatch("app/dismissNotification");
  },
};

export default {
  install(Vue) {
    Vue.prototype.$notify = notification;
  },
};
