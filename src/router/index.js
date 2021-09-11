import Vue from 'vue';
import VueRouter from 'vue-router';
import { showLoading, hideLoading } from '@/utils/loading';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/sign-in',
    name: '登录',
    component: () => import('../views/SignIn.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/',
    name: '正在加载',
    component: () => import('@/views/Barren.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/dashboard',
    name: '综合看板',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/three/levels/demo',
    name: '三级菜单示例',
    component: () => import('@/views/ThreeLevelsMenuDemo.vue'),
  },
];

const moduleFiles = require.context('./modules', true, /.*\.js$/);
const modules = moduleFiles.keys().reduce((l, k) => [...l, ...moduleFiles(k).default], []);

const router = new VueRouter({
  routes: [...routes, ...modules],
});

/**
 * *
 */
router.beforeEach(async (to, _, next) => {
  // loading bar & title
  showLoading();
  document.title = (to.name ? to.name + '-' : '') + 'Vuetify Admin';

  if (to.path === '/') {
    next();
  } else {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      if (to.path !== '/sign-in') {
        next({ path: '/', replace: true });
      } else {
        next();
      }
    } else {
      if (to.path === '/sign-in') {
        next({ path: '/', replace: true });
      } else {
        // bring the lost username in vuex due to refresh by hand back
        const signedInUser = sessionStorage.getItem('signed-in-user');
        if (store.state.user.username == '' && signedInUser) {
          await store.dispatch('user/setUser', signedInUser);
        }

        if (to.meta && !to.meta.isPublic && !store.getters.authMenus.includes(to.path)) {
          next({ path: '/error/403', replace: true });
        } else {
          next();
        }
      }
    }
  }
});

router.afterEach(() => {
  hideLoading();
});

export default router;
