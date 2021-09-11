<template>
  <v-card>
    <v-row class="px-5">
      <v-col cols="8">
        <div style="color: rgba(0, 0, 0, 0.37)">{{ title }}</div>
        <div>
          <span class="text-h5 mr-1">{{ count }}</span>
          <span style="color: rgba(0, 0, 0, 0.618)">/ {{ total }}</span>
          <small class="ml-1" v-show="unit">({{ unit }})</small>
        </div>
        <router-link :to="path"><a class="info--text" style="font-size: 14px; text-decoration: none">DETAILS</a></router-link>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-end">
        <v-avatar :color="color" tile class="rounded-lg" size="64px">
          <v-icon color="white">{{ icon }}</v-icon>
        </v-avatar>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ['title', 'count', 'total', 'color', 'icon', 'unit', 'path'],
};
</script>
