<template>
  <v-dialog :value="value" width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 新增子菜单 </v-card-title>
      <v-card-text v-if="parent">
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
              <v-text-field :value="parent.name" label="父菜单" readonly />
            </v-col>
            <v-col cols="12">
              <v-radio-group
                v-model="createData['type']"
                row
                label="类型*"
                mandatory
              >
                <v-radio
                  label="菜单"
                  :value="2"
                  :disabled="parent.level === 3"
                ></v-radio>
                <v-radio label="操作" :value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="名称*"
                required
                v-model="createData['name']"
                :rules="[(value) => !!value || '名称不可为空']"
              ></v-text-field>
            </v-col>
            <template v-if="createData['type'] < 3">
              <v-col cols="12">
                <v-text-field
                  label="前端路由*"
                  required
                  v-model="createData['url']"
                  :rules="[(value) => !!value || '前端路由不可为空']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="顺序*"
                  type="number"
                  required
                  v-model="createData['order']"
                  :rules="[(value) => !!value || '顺序不可为空']"
                ></v-text-field>
              </v-col>
            </template>
            <v-col cols="12" v-else>
              <v-text-field
                label="操作标识*"
                required
                v-model="createData['path']"
                :rules="[(value) => !!value || '操作标识不可为空']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <small v-if="parent.level === 3">* 三级菜单只能创建“操作”子菜单</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="create" :loading="creating">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { createMenu } from "../../../api/menu";

export default {
  props: ["value", "parent"],
  data() {
    return {
      // indications
      indications: {
        warning: "",
        error: ""
      },
      warningAlert: false,
      errorAlert: false,
      // create data
      createData: {},
      creating: false
    };
  },
  watch: {
    value(val) {
      if (!val) {
        // 关闭时
        this.createData = {};
        this.$refs.form.resetValidation();
      } else {
        if (this.parent.level === 3) {
          this.createData["type"] = 3;
        }
      }
    }
  },
  methods: {
    async create() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.creating = true;
        const createData = {
          ...this.createData,
          parentId: this.parent.key,
          isLeaf: true
        };

        await createMenu(createData);

        this.$notify.success("菜单已新建");

        this.$emit("input", false);
        this.creating = false;
        this.$emit("after");
      }
    }
  }
};
</script>
