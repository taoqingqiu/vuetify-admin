import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import { showLoading, hideLoading } from "@/utils/loading";
import { getAccessToken } from "@/utils/storage-util";
import { flattenTree } from "@/utils/tree-util";

Vue.use(VueRouter);

// -- routes definition

const routesOutOfList = [
  {
    path: "/",
    name: "正在加载",
    component: () => import("@/views/Barren.vue"),
    meta: { public: true },
  },
  {
    path: "/sign-in",
    name: "登录",
    component: () => import("../views/SignIn.vue"),
    meta: { public: true },
  },
];

export const routes = [
  {
    path: "/dashboard",
    name: "综合看板",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      icon: "mdi-view-dashboard",
      order: 1,
    },
  },
];

const modules = require.context("./modules", true, /.*\.js$/);
routes.push(
  ...modules.keys().reduce((l, k) => [...l, ...modules(k).default], [])
);
routes.sort((r1, r2) =>
  r1.meta && r2.meta ? r1.meta.order - r2.meta.order : -1
);

const router = new VueRouter({
  routes: [...routes, ...routesOutOfList],
});

// -- router guard

const matchDynamic = (current_route, dynamic_route_path) => {
  return Object.entries(current_route.params).some(
    ([key]) =>
      dynamic_route_path ===
      current_route.path.split("/").slice(0, -1).join("/") + "/:" + key
  );
};

/**
 * Check whether route exists
 * @param route
 * @returns {boolean}
 */
const checkExistence = (route) => {
  const routesFlattened = flattenTree([...routes, ...routesOutOfList]);
  return routesFlattened.some(
    (rf) =>
      route.path === rf.path ||
      (rf.path.includes(":") && matchDynamic(route, rf.path))
  );
};

/**
 * Check whether route is accessible
 * especially, '/' and some public routes are for sure accessible
 * @param route
 * @returns {boolean}
 */
const checkAccessibility = (route) => {
  return (
    route.path === "/" ||
    (route.meta && route.meta.public) ||
    store.getters.accessibleRoutes.includes(route.path) ||
    store.getters.accessibleRoutes
      .filter((r) => r.includes(":"))
      .some((r) => matchDynamic(route, r))
  );
};

/**
 * Router guard used to check state of authentication and redirect
 */
router.beforeEach(async (to, _, next) => {
  // loading bar & title
  showLoading();
  document.title = (to.name ? to.name + " - " : "") + "Vuetify Admin";

  const token = getAccessToken();
  if (token && to.path === "/sign-in") {
    next({ path: "/", replace: true });
  } else {
    if (!checkExistence(to)) {
      store.commit("app/SET_ERROR", 404);
    } else if (!checkAccessibility(to)) {
      store.commit("app/SET_ERROR", 403);
    }
    next();
  }
});

router.afterEach(() => {
  hideLoading();
});

export default router;
