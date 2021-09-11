<template>
  <v-dialog :value="value" width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 编辑菜单 </v-card-title>
      <v-card-text v-if="menu">
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
            <v-col cols="12" v-if="menu.level === 1">
              <v-menu offset-y max-width="600px" v-model="selectIconMenu">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-on="on"
                    v-bind="attrs"
                    label="图标*"
                    required
                    v-model="editData['icon']"
                    :rules="[(value) => !!value || '图标不可为空']"
                  >
                    <template #prepend-inner>
                      <v-icon v-if="editData['icon']">{{
                        editData["icon"]
                      }}</v-icon>
                    </template>
                  </v-text-field>
                </template>
                <icon-picker v-model="editData['icon']" />
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="类型"
                readonly
                :value="
                  menu['type'] == 1
                    ? '一级菜单'
                    : menu['menuType'] == 2
                    ? '子菜单'
                    : '按钮/权限'
                "
              ></v-text-field>
            </v-col>
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
                label="前端路由*"
                required
                v-model="editData['path']"
                :rules="[(value) => !!value || '路由不可为空']"
                v-if="menu['menuType'] < 3"
              ></v-text-field>
              <v-text-field
                label="操作标识*"
                required
                v-model="editData['path']"
                :rules="[(value) => !!value || '标识不可为空']"
                v-else
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="顺序*"
                type="number"
                required
                v-model="editData['order']"
                v-if="menu.menuType < 3"
                :rules="[(value) => value !== '' || '顺序不可为空']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <small class="mt-4">*菜单类型不可修改</small>
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
import { updateMenu } from "../../../api/menu";
import IconPicker from "vuetify-icon-picker";

export default {
  props: ["value", "menu"],
  components: { IconPicker },
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
      editData: {},
      editing: false,
      // select icon
      selectIconMenu: false
    };
  },
  watch: {
    value(val) {
      if (!val) {
        // 关闭时
        this.editData = {};
        this.$refs.form.resetValidation();
      } else {
        this.editData = JSON.parse(JSON.stringify(this.menu));
      }
    }
  },
  computed: {
    modified() {
      return JSON.stringify(this.editData) !== JSON.stringify(this.menu);
    }
  },
  methods: {
    async edit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.modified) {
          this.editing = true;
          await updateMenu(this.menu.id, this.editData);
          this.$notify.success("更新已保存");
          this.$emit("after");
          this.editing = false;
        }
        this.$emit("input", false);
      }
    }
  }
};
</script>
