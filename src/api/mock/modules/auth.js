import { createResponse } from "../response-util";

export default {
  "get|/api/auth/token": createResponse("auth-token"),
  "get|/api/auth/authorities": createResponse({
    menus: [
      {
        path: "/dashboard",
        icon: "mdi-view-dashboard-outline",
        name: "综合看板",
        order: 1,
      },
      {
        path: "/management",
        icon: "mdi-application-settings-outline",
        name: "系统管理",
        order: 3,
        children: [
          {
            name: "用户管理",
            path: "/management/user",
            order: 1,
          },
          {
            name: "菜单管理",
            path: "/management/menu",
            order: 2,
          },
          {
            name: "角色管理",
            path: "/management/role",
            order: 3,
          },
        ],
      },
      {
        path: "/three",
        icon: "mdi-layers-outline",
        name: "三级菜单",
        order: 2,
        children: [
          {
            name: "菜单",
            path: "/three/levels",
            order: 1,
            children: [
              {
                name: "示例",
                path: "/three/levels/demo",
              },
            ],
          },
        ],
      },
    ],
    actions: [
      {
        action: "user:delete",
        description: "删除用户",
      },
    ],
  }),
};
