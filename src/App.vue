<template>
  <v-app>
    <!-- notification -->
    <notification />
    <template v-if="!hideBarList.includes($route.path)">
      <!-- app bar -->
      <app-bar />

      <!-- nav drawer -->
      <nav-drawer />
    </template>

    <!-- settings drawer -->
    <settings-drawer v-model="$store.state.app.settingsDrawer" />

    <v-main style="background-color: #f2f3f8">
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import AppBar from './components/app/AppBar.vue';
import NavDrawer from './components/app/NavDrawer.vue';
import SettingsDrawer from './components/app/SettingsDrawer.vue';
import Notification from './components/app/Notification.vue';

export default {
  name: 'App',
  components: {
    Notification,
    AppBar,
    NavDrawer,
    SettingsDrawer,
  },
  data() {
    return {
      hideBarList: ['/sign-in', '/sign-up', '/error/404', '/error/403', '/'],
    };
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
