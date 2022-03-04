<template>
  <v-container
    fluid
    fill-height
    :class="[{ white: !$vuetify.theme.dark }, 'justify-center']"
  >
    动态路由示例
    <br />
    <router-link to="/dynamic-route-demo/123">点击跳转</router-link>
  </v-container>
</template>
