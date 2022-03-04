<template>
  <v-container
    fluid
    fill-height
    :class="[{ white: !$vuetify.theme.dark }, 'justify-center']"
  >
    id: {{ $route.params.id }}
    <br />
    动态路由示例子页面
  </v-container>
</template>
