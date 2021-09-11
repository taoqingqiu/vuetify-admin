export default [
  {
    path: '/management/user',
    name: '用户管理',
    component: () => import('@/views/management/User.vue'),
  },
  {
    path: '/management/menu',
    name: '菜单管理',
    component: () => import('@/views/management/Menu.vue'),
  },
  {
    path: '/management/role',
    name: '角色管理',
    component: () => import('@/views/management/Role.vue'),
  },
];
