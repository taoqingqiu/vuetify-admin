<template>
  <v-app-bar
    :color="clipped ? ($vuetify.theme.dark ? '#1e1e1e' : '#17263d') : 'auto'"
    app
    flat
    :clipped-left="clipped"
    :class="{ blurred: !clipped && !$vuetify.theme.dark }"
    :dark="clipped"
  >
    <v-app-bar-nav-icon class="d-lg-none" @click.stop="showNavDrawer">
    </v-app-bar-nav-icon>

    <template v-if="clipped">
      <v-img
        max-width="24"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
        class="mr-3"
      ></v-img>
      <div class="title white--text d-none d-md-block">Vuetify Admin</div>
    </template>

    <v-spacer />

    <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon>
        {{
          $vuetify.theme.dark
            ? "mdi-white-balance-sunny"
            : "mdi-moon-waxing-crescent"
        }}
      </v-icon>
    </v-btn>
    <v-btn icon @click="$store.commit('app/SET_CLIPPED', !clipped)">
      <v-icon>
        {{
          !clipped ? "$vuetify.icons.layout-clipped" : "$vuetify.icons.layout"
        }}
      </v-icon>
    </v-btn>

    <!-- avatar -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs" class="mr-1" light>
          <v-avatar size="32px" color="rgb(207, 224, 214)">
            {{ $store.state.user.username[0] || "" }}
          </v-avatar>
        </v-btn>
      </template>
      <v-list
        dense
        class="pa-0 text-center"
        :class="{ blurred: !clipped && !$vuetify.theme.dark }"
        max-width="100"
      >
        <v-list-item class="text-caption py-0">
          <v-list-item-title class="text-truncate">
            {{ $store.state.user.username }}
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item @click="signOut" class="red--text">
          <v-list-item-title> 退出登录 </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- loading -->
    <v-progress-linear
      :value="loading.progress"
      v-if="loading.isLoading"
      absolute
      top
      color="info"
      height="2"
    />
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    settingsDrawer: false,
  }),
  computed: {
    loading() {
      return this.$store.state.app.loading;
    },
    clipped() {
      return this.$store.state.app.clipped;
    },
  },
  methods: {
    showNavDrawer() {
      this.$store.commit(
        "app/SET_NAV_DRAWER",
        !this.$store.state.app.navDrawer
      );
    },
    signOut() {
      sessionStorage.removeItem("auth-token");
      sessionStorage.removeItem("signed-in-user");
      this.$router.push("/sign-in");
    },
  },
};
</script>
<style>
.blurred {
  background: rgba(255, 255, 255, 0.618) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
}
</style>
