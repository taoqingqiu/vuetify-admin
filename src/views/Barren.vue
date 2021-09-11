<template>
  <v-container fill-height class="ma-0 pa-0" fluid style="background-color: #233a5f">
    <v-overlay opacity="0">
      <v-alert text color="info" style="box-shadow: 0 0 10px #29b6f6, 0 0 37px #29b6f6, 0 0 61.8px #29b6f6, 0 0 198px #29b6f6">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-alert>
    </v-overlay>
  </v-container>
</template>
<script>
export default {
  /**
   * 跳转页根据 auth-token 等，决定跳转的目标页面
   */
  created() {
    setTimeout(() => {
      const token = sessionStorage.getItem('auth-token');
      this.$router.replace(token ? this.$store.getters.authMenus[0] : '/sign-in');
    }, 1000);
  },
};
</script>
