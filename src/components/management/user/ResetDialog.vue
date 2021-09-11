<template>
  <v-dialog :value="value" width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 重置密码 </v-card-title>
      <v-card-text>
        <v-alert
          text
          type="warning"
          icon="mdi-alert-circle"
          dismissible
          close-icon="mdi-close"
          v-model="warningAlert"
          >{{ indications.warning }}</v-alert
        >
        <v-alert
          text
          type="error"
          icon="mdi-alert"
          dismissible
          close-icon="mdi-close"
          v-model="errorAlert"
          >{{ indications.error }}</v-alert
        >
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="新密码*"
                type="password"
                required
                v-model="password"
                :rules="[(value) => !!value || '请输入新密码']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                label="重复新密码*"
                required
                v-model="passwordAgain"
                validate-on-blur
                :rules="[
                  (value) => !!value || '请再次输入新密码',
                  (value) => value === password || '两次密码不一致'
                ]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="reset" :loading="reseting"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { resetPassword } from "../../../api/user";
export default {
  props: ["value", "user"],
  data() {
    return {
      // indications
      indications: {
        warning: "",
        error: ""
      },
      warningAlert: false,
      errorAlert: false,
      password: "",
      passwordAgain: "",
      reseting: false
    };
  },
  watch: {
    value(val) {
      if (!val) {
        // 关闭时
        this.password = "";
        this.passwordAgain = "";
        this.$refs.form.resetValidation();
      }
    }
  },
  methods: {
    async reset() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.reseting = true;
        await resetPassword(this.user.id, this.password);
        this.$notify.success("密码已重置！");
        this.reseting = false;
        this.$emit("input", false);
      }
    }
  }
};
</script>
