export default [
  {
    name: "三级",
    path: "/three",
    children: [
      {
        name: "菜单",
        path: "/three/levels",
        children: [
          {
            path: "/three/levels/demo",
            name: "三级菜单示例",
            component: () =>
              import("@/views/three-levels-menu/ThreeLevelsMenuDemo.vue"),
          },
        ],
      },
      {
        name: "菜单2",
        path: "/three/levels-another",
        children: [
          {
            path: "/three/levels-another/demo",
            name: "三级菜单示例2",
            component: () =>
              import("@/views/three-levels-menu/ThreeLevelsMenuDemo2.vue"),
          },
        ],
      },
    ],
    meta: {
      icon: "mdi-card-multiple",
      order: 3,
    },
  },
];
