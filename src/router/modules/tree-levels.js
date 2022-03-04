export default [
  {
    name: "三级",
    children: [
      {
        name: "菜单",
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
  },
];
