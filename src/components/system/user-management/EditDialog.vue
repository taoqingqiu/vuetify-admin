<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card :loading="loading">
      <v-card-title> 编辑用户 </v-card-title>
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
                label="用户名*"
                required
                v-model="formData['username']"
                :rules="[(value) => !!value || '用户名不可为空']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="角色"
                v-model="formData['roles']"
                :items="roles"
                multiple
                item-text="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="5">
              <v-switch label="重置密码" v-model="resetPassword"></v-switch>
            </v-col>
            <v-col cols="7">
              <v-text-field
                v-if="resetPassword"
                label="新密码*"
                required
                v-model="formData['password']"
                :rules="[(value) => !!value || '密码不可为空']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                :true-value="1"
                :false-value="0"
                v-model="formData['state']"
                :label="`状态: ${formData['state'] ? '正常' : '冻结'}`"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)" text> 取消 </v-btn>
        <v-btn color="primary" @click="submit" :loading="submitting" text>
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { getRoles } from "@/api/role";
import { createUser } from "@/api/user";

export default {
  props: ["value", "item"],
  data() {
    return {
      // indications
      indications: {
        warning: "",
        error: "",
      },
      warningAlert: false,
      errorAlert: false,
      // form data
      formData: {},
      resetPassword: false,
      loading: false,
      submitting: false,
      roles: [],
    };
  },
  watch: {
    async value(val) {
      if (!val) {
        this.formData = {};
        this.resetPassword = false;
        this.$refs.form.resetValidation();
        this.errorAlert = false;
        this.warningAlert = false;
      } else {
        this.loading = true;
        this.roles = (await getRoles()).data;
        this.formData = JSON.parse(JSON.stringify(this.item));
        this.loading = false;
      }
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        "password" in this.formData &&
          !this.formData["password"] &&
          delete this.formData["password"];
        if (JSON.stringify(this.item) !== JSON.stringify(this.formData)) {
          this.submitting = true;

          await createUser(this.formData);
          this.$notify.success("已更新!");
          setTimeout(() => {
            this.$notify.info("重载列表..", true);
            this.$emit("reload");
          }, 800);

          this.submitting = false;
        }
        this.$emit("input", false);
      }
    },
  },
};
</script>
