<template>
  <v-app-bar color="#17263d" app flat dense clipped-left dark>
    <v-app-bar-nav-icon class="d-lg-none" @click.stop="showNavDrawer"> </v-app-bar-nav-icon>
    <v-img max-width="24" src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg" class="mr-3"></v-img>
    <div class="title white--text d-none d-md-block">Vuetify Admin</div>
    <v-spacer />
    <v-text-field
      single-line
      height="32px"
      rounded
      flat
      class="rounded-lg"
      prepend-inner-icon="mdi-magnify"
      hide-details
      background-color="#233a5f"
      style="max-width: 240px"
    />
    <v-btn icon @click="$store.commit('app/SET_SETTINGS_DRAWER', true)">
      <v-icon> mdi-cog</v-icon>
    </v-btn>

    <!-- 系统消息 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-badge left dot color="pink lighten-1" offset-x="2" offset-y="9" v-if="false">
            <v-icon>mdi-bell-ring-outline</v-icon>
          </v-badge>
          <v-icon v-else>mdi-bell-ring-outline</v-icon>
        </v-btn>
      </template>
      <v-list dense width="200px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>未读 (0)</v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle> 暂无消息~ </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- avatar -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs" class="mr-1">
          <v-avatar size="32px">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list dense max-width="150px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>个人中心</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut">
          <v-list-item-content>
            <v-list-item-subtitle class="red--text">退出登录</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- loading -->
    <v-progress-linear :value="loading.progress" v-if="loading.isLoading" absolute top color="info" height="2" />
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
    currRoute() {
      return this.$route.path;
    },
  },
  watch: {
    currRoute(val) {
      if (val === '/sign-in') {
        this.mini = false;
      }
    },
  },
  methods: {
    showNavDrawer() {
      this.$store.commit('app/SET_NAV_DRAWER', !this.$store.state.app.navDrawer);
    },
    signOut() {
      sessionStorage.removeItem('auth-token');
      sessionStorage.removeItem('signed-in-user');
      this.$router.push('/sign-in');
    },
  },
};
</script>
