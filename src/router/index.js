import Vue from "vue";
import VueRouter from "vue-router";
import { showLoading, hideLoading } from "@/utils/loading";
import store from "@/store";
import { getAuthToken, getStorageItem } from "@/utils/storage-util";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/sign-in",
    name: "登录",
    component: () => import("../views/SignIn.vue"),
    meta: { public: true },
  },
  {
    path: "/",
    name: "正在加载",
    component: () => import("@/views/Barren.vue"),
    meta: { public: true },
  },
  {
    path: "/dashboard",
    name: "综合看板",
    component: () => import("@/views/Dashboard.vue"),
  },
];

const moduleFiles = require.context("./modules", true, /.*\.js$/);
const moduleRoutes = moduleFiles
  .keys()
  .reduce((l, k) => [...l, ...moduleFiles(k).default], []);
routes.push(...moduleRoutes);

const router = new VueRouter({
  routes,
});

/**
 * router guard used to
 * check state of authentication
 * and redirect
 */
router.beforeEach(async (to, _, next) => {
  // loading bar & title
  showLoading();
  document.title = (to.name ? to.name + " - " : "") + "Vuetify Admin";

  const token = getAuthToken();

  if (store.getters.dev) {
    console.log("[DEBUG] token is: " + token, "target route is: " + to.path);
  }

  // bring the lost username in vuex due to refreshing manually back
  const signedInUser = getStorageItem("signed-in-user");
  if (!store.getters.userInfo && signedInUser) {
    await store.dispatch("user/setUser");
  }

  if (to.path === "/") {
    next();
  } else {
    if (!token) {
      if (to.path !== "/sign-in") {
        next({ path: "/", replace: true });
      } else {
        next();
      }
    } else {
      if (to.path === "/sign-in") {
        next({ path: "/", replace: true });
      } else {
        if (
          to.meta &&
          !to.meta.public &&
          !store.getters.authMenus.includes(to.path) &&
          !to.meta.subRoute
        ) {
          next({ path: "/error/403", replace: true });
        } else {
          next();
        }
      }
    }
  }

  if (token) {
    if (to.path === "/sign-in") {
    }
  }
});

router.afterEach(() => {
  hideLoading();
});

export default router;
