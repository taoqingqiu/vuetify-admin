<template>
  <v-dialog v-model="value" width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 编辑角色 </v-card-title>
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
                label="名称*"
                required
                v-model="editData['name']"
                :rules="[(value) => !!value || '名称不可为空']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="标识*"
                required
                v-model="editData['symbol']"
                :rules="[(value) => !!value || '标识不可为空']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="描述"
                v-model="editData['description']"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="edit" :loading="editing"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { updateRole } from "../../../api/role";
export default {
  props: ["value", "role"],
  data() {
    return {
      indications: {
        warning: "",
        error: ""
      },
      warningAlert: false,
      errorAlert: false,
      editData: {},
      editing: false
    };
  },
  watch: {
    value(val) {
      if (!val) {
        this.warningAlert = false;
        this.errorAlert = false;
        this.editData = {};
        this.$refs.form.resetValidation();
      } else {
        this.editData = JSON.parse(JSON.stringify(this.role));
      }
    }
  },
  computed: {
    modified() {
      return JSON.stringify(this.editData) !== JSON.stringify(this.role);
    }
  },
  methods: {
    async edit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.modified) {
          this.editing = true;

          await updateRole(this.role.id, this.editData);

          this.editing = false;
          this.$notify.success("角色已更新！");
          setTimeout(() => {
            this.$notify.info("重新加载角色列表..", true);
            this.$emit("reload");
          }, 800);
        }
      }
      this.$emit("input", false);
    }
  }
};
</script>
