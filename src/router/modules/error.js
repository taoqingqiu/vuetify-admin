export default [
  {
    path: '/error/404',
    name: '404',
    component: () => import('@/views/errors/404.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/error/403',
    name: '403',
    component: () => import('@/views/errors/403.vue'),
    meta: { isPublic: true },
  },
  {
    path: '*',
    redirect: '/error/404',
  },
];
