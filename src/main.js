import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import notify from "./utils/notify";

Vue.use(notify);
Vue.config.productionTip = false;
process.env.NODE_ENV === "development" && import("./mock");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
