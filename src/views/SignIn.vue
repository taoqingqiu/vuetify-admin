<template>
  <v-container
    fill-height
    class="justify-center"
    style="background-color: #233a5f"
    fluid
  >
    <v-card
      :loading="signingIn"
      class="col-lg-4 col-sm-5 col-xl-3 py-0"
      style="
        margin-bottom: 48px;
        background-color: #17263d;
        box-shadow: 0 0 10px #17263d;
      "
      dark
    >
      <v-card-text class="text-center pt-6">
        <v-img
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
          class="d-inline-block"
          max-width="48"
        ></v-img>
        <div
          class="text-h5 mb-4"
          style="color: #fff; letter-spacing: 2px !important"
        >
          Vuetify Admin
        </div>

        <v-alert
          text
          color="warning"
          dismissible
          close-icon="mdi-close"
          v-model="warningAlert"
          >{{ indications.warning }}</v-alert
        >
        <v-alert
          text
          color="error"
          dismissible
          close-icon="mdi-close"
          v-model="errorAlert"
          >{{ indications.error }}</v-alert
        >
        <v-form ref="signInForm" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="[(v) => !!v || '账号不能为空！']"
            label="账号*"
            required
          ></v-text-field>
          <v-text-field
            :type="passwordType ? 'password' : 'text'"
            v-model="password"
            :rules="[(v) => !!v || '密码不能为空！']"
            label="密码*"
            required
            :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="passwordType = !passwordType"
            @keydown="whenPressingEnter"
          ></v-text-field>
          <v-checkbox class="mb-4" label="记住我的登录信息"> </v-checkbox>
        </v-form>
        <v-btn color="primary" @click="signIn" block> 登录 </v-btn>
      </v-card-text>

      <v-card-actions class="px-4 pt-4 pb-6">
        <div
          class="d-flex align-center"
          style="font-size: 15px; color: #959da4"
        >
          忘记密码?<a href="#" style="color: white" class="mx-1">点此找回</a>
        </div>
        <v-spacer />
        <div
          class="d-flex align-center"
          style="font-size: 15px; color: #959da4"
        >
          其他方式<a href="#" style="color: white" class="mx-1">登录</a>
        </div>
      </v-card-actions>
    </v-card>
    <v-toolbar
      style="
        background-color: #17263d;
        width: 100%;
        color: #959da4;
        letter-spacing: 2px;
        font-size: 12px;
        font-weight: 618;
      "
      dense
      absolute
      bottom
      flat
      class="ma-0"
    >
      <v-spacer />
      <div class="text-right">
        By
        <a href="https://github.com/taoqingqiu" style="color: #fff">Qingqiu</a>
        <br />version {{ version }}
      </div>
    </v-toolbar>
  </v-container>
</template>
<script>
import { version } from "../../package.json";
import md5 from "md5";
import { getToken, getAuthorities } from "@/api/auth";

export default {
  data() {
    return {
      username: "",
      password: "",
      signingIn: false,
      passwordType: true,
      readAndAgree: false,
      warningAlert: false,
      errorAlert: false,
      indications: { warning: "", error: "" },
      version,
    };
  },
  methods: {
    async signIn() {
      // validate and login
      const valid = this.$refs["signInForm"].validate();
      if (valid) {
        this.signingIn = true;
        const response = await getToken(this.username, md5(this.password));
        if (response.status === 0) {
          if (process.env.NODE_ENV === "development") {
            const { menus, actions } = (await getAuthorities()).data;
            sessionStorage.setItem(
              "menus-actions",
              JSON.stringify({ menus, actions })
            );
          }

          sessionStorage.setItem("auth-token", response.data.token);
          sessionStorage.setItem("signed-in-user", this.username);
          await this.$store.dispatch("user/setUser", this.username);
          await this.$router.push("/");
        } else {
          this.indications.error = response.message;
          this.errorAlert = true;
        }
        this.signingIn = false;
      }
    },
    whenPressingEnter(e) {
      if (e.key === "Enter") {
        this.signIn();
      }
    },
  },
};
</script>
