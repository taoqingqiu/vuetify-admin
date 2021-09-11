export default [
  {
    path: '/personal',
    name: '个人中心',
    component: () => import('@/views/errors/404.vue'),
    meta: { isPublic: true },
  },
];
