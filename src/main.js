import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notify from "./plugins/notify";

Vue.use(notify);
Vue.config.productionTip = false;

// mock when dev and gh-pages
if (
  process.env.NODE_ENV === "ghPages" ||
  process.env.NODE_ENV === "development"
)
  import("./api/mock");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
