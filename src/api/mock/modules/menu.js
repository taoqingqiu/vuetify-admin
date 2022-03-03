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
      order: 1,
    },
    {
      id: 3,
      name: "三级菜单",
      icon: "mdi-layers-outline",
      path: "/three",
      type: 1,
      isLeaf: false,
      order: 2,
    },
    {
      id: 2,
      name: "系统管理",
      icon: "mdi-application-settings-outline",
      path: "/management",
      type: 1,
      isLeaf: false,
      order: 3,
    },
  ]),
  "get|/api/menu-management/menu-tree": createResponse([
    {
      id: 1,
      path: "/dashboard",
      icon: "mdi-view-dashboard-outline",
      name: "综合看板",
      type: 1,
      isLeaf: true,
      order: 1,
    },
    {
      id: 2,
      path: "/management",
      icon: "mdi-application-settings-outline",
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
          path: "/management/user",
        },
        {
          id: 6,
          name: "菜单管理",
          type: 2,
          isLeaf: true,
          order: 2,
          path: "/management/menu",
        },
        {
          id: 7,
          name: "角色管理",
          type: 2,
          isLeaf: true,
          order: 2,
          path: "/management/role",
        },
      ],
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
              path: "/three/levels/demo",
            },
          ],
        },
      ],
    },
  ]),
  "get|/api/menu-management/menu-list": createResponse([
    {
      module: "综合看板",
      menus: [
        {
          id: 1,
          name: "综合看板",
        },
      ],
    },
    {
      module: "系统管理",
      menus: [
        {
          id: 2,
          name: "用户管理",
        },
        {
          id: 3,
          name: "菜单管理",
        },
        {
          id: 4,
          name: "角色管理",
        },
      ],
      actions: [
        {
          id: 5,
          name: "新建用户",
        },
        {
          id: 6,
          name: "编辑用户",
        },
        {
          id: 7,
          name: "删除用户",
        },
        {
          id: 8,
          name: "新建菜单",
        },
        {
          id: 9,
          name: "编辑菜单",
        },
        {
          id: 10,
          name: "删除菜单",
        },
        {
          id: 11,
          name: "新建角色",
        },
        {
          id: 12,
          name: "编辑角色",
        },
        {
          id: 13,
          name: "删除角色",
        },
      ],
    },
    {
      module: "三级菜单",
      menus: [
        {
          id: 14,
          name: "示例",
        },
      ],
    },
  ]),
  "post|/api/menu-management/menu": createResponse(),
  "put|/api/menu-management/menu/\\d+": createResponse(),
  "delete|/api/menu-management/menus": createResponse(),
};
