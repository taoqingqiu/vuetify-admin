export default [
  {
    path: "/system/user-management",
    name: "用户管理",
    component: () => import("@/views/system/UserManagement.vue"),
  },
  {
    path: "/system/role-management",
    name: "角色管理",
    component: () => import("@/views/system/RoleManagement.vue"),
  },
];
