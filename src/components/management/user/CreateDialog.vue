<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title> 新增用户 </v-card-title>
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
              <v-text-field
                label="密码*"
                required
                v-model="formData['password']"
                :rules="[(value) => !!value || '密码不可为空']"
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
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)" text> 取消 </v-btn>
        <v-btn color="primary" @click="submit" :loading="loading" text>
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
  props: ["value"],
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
      loading: false,
      roles: [],
    };
  },
  watch: {
    async value(val) {
      if (!val) {
        this.formData = {};
        this.$refs.form.resetValidation();
        this.errorAlert = false;
        this.warningAlert = false;
      } else {
        this.roles = (await getRoles()).data;
      }
    },
  },
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.loading = true;

        await createUser(this.formData);
        this.$notify.success("已新建!");
        setTimeout(() => {
          this.$notify.info("重载列表..", true);
          this.$emit("reload");
        }, 800);

        this.loading = false;
        this.$emit("input", false);
      }
    },
  },
};
</script>
