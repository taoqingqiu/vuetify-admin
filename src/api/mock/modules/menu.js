import { createResponse } from "../response-util";

export default {
  "get|/api/menu-management/menus": createResponse([
    {
      id: 1,
      name: "综合看板",
      icon: "mdi-view-dashboard-outline",
      path: "/dashboard",
      type: 1,
      isLeaf: true,
      order: 1
    },
    {
      id: 3,
      name: "三级菜单",
      icon: "mdi-layers-outline",
      path: "/three",
      type: 1,
      isLeaf: false,
      order: 2
    },
    {
      id: 2,
      name: "系统管理",
      icon: "mdi-application-settings",
      path: "/management",
      type: 1,
      isLeaf: false,
      order: 3
    }
  ]),
  "get|/api/menu-management/menu-tree": createResponse([
    {
      id: 1,
      path: "/dashboard",
      icon: "mdi-view-dashboard-outline",
      name: "综合看板",
      type: 1,
      isLeaf: true,
      order: 1
    },
    {
      id: 2,
      path: "/management",
      icon: "mdi-application-settings",
      name: "系统管理",
      type: 1,
      isLeaf: false,
      order: 3,
      children: [
        {
          id: 5,
          name: "用户管理",
          type: 2,
          isLeaf: true,
          order: 1,
          path: "/management/user"
        },
        {
          id: 6,
          name: "菜单管理",
          type: 2,
          isLeaf: true,
          order: 2,
          path: "/management/menu"
        },
        {
          id: 7,
          name: "角色管理",
          type: 2,
          isLeaf: true,
          order: 2,
          path: "/management/role"
        }
      ]
    },
    {
      id: 3,
      path: "/three",
      icon: "mdi-layers-outline",
      name: "三级菜单",
      type: 1,
      isLeaf: false,
      order: 2,
      children: [
        {
          id: 8,
          name: "菜单",
          path: "/three/levels",
          type: 2,
          isLeaf: false,
          order: 1,
          children: [
            {
              id: 9,
              type: 3,
              isLeaf: true,
              name: "示例",
              path: "/three/levels/demo"
            }
          ]
        }
      ]
    }
  ]),
  "post|/api/menu-management/menu": createResponse(),
  "put|/api/menu-management/menu/\\d+": createResponse(),
  "delete|/api/menu-management/menus": createResponse()
};
