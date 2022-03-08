export default [
  {
    name: "系统管理",
    path: "/system",
    children: [
      {
        path: "/system/user-management",
        name: "用户管理",
        component: () => import("@/views/system/UserManagement.vue"),
        meta: {
          order: 1,
        },
      },
      {
        path: "/system/role-management",
        name: "角色管理",
        component: () => import("@/views/system/RoleManagement.vue"),
        meta: {
          order: 2,
        },
      },
    ],
    meta: {
      icon: "mdi-application-settings",
      order: 2,
    },
  },
];
