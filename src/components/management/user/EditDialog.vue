<template>
  <v-dialog :value="value" width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 编辑用户 </v-card-title>
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
              <v-row>
                <v-col cols="3" class="d-flex align-center justify-center">
                  <v-menu v-model="setAvatar" :key="value">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        block
                        v-on="on"
                        v-bind="attrs"
                        v-if="!editData['avatar']"
                        >设置头像</v-btn
                      >
                      <v-btn v-else v-on="on" v-bind="attrs" fab x-large>
                        <v-avatar size="64">
                          <v-img :src="editData['avatar']"> </v-img>
                        </v-avatar>
                      </v-btn>
                    </template>
                    <v-card
                      flat
                      class="pa-2"
                      @click.stop.native
                      style="width: 400px"
                    >
                      <avatar-uploader
                        @confirm="confirmAvatar"
                        hideShapeGroup
                        :img="editData['avatar']"
                      >
                        <template #[`action.innerSelectButton`]="{ on }">
                          <v-icon v-on="on">mdi-upload</v-icon>
                        </template>
                        <template #[`action.slider`]="{ on, attrs }">
                          <v-slider
                            v-on="on"
                            v-bind="attrs"
                            step="0.01"
                            hide-details
                          />
                        </template>
                        <template
                          #[`action.shapeGroup`]="{ on, attrs, options }"
                        >
                          <v-radio-group
                            @change="on.input"
                            v-bind="attrs"
                            row
                            dense
                            hide-details
                            class="mt-0"
                          >
                            <v-radio
                              :label="option.text"
                              :value="option.value"
                              v-for="(option, index) in options"
                              :key="index"
                            ></v-radio>
                          </v-radio-group>
                        </template>
                        <template #[`action.selectButton`]="{ on, text }">
                          <v-btn v-on="on" small>{{ text }}</v-btn>
                        </template>
                        <template #[`action.confirmButton`]="{ on, attrs }">
                          <v-btn v-on="on" v-bind="attrs" small>确定</v-btn>
                        </template>
                      </avatar-uploader>
                    </v-card>
                  </v-menu>
                </v-col>
                <v-col cols="9">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="用户名*"
                        required
                        v-model="editData['username']"
                        :rules="[(value) => !!value || '用户名不可为空']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="邮箱*"
                        required
                        v-model="editData['email']"
                        :rules="[(value) => !!value || '邮箱不可为空']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="[
                  { text: '男', value: 1 },
                  { text: '女', value: 2 }
                ]"
                v-model="editData['gender']"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                label="角色"
                v-model="editData['roleIds']"
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
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="edit" :loading="editing"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { getRoles } from "@/api/role";
import { updateUser, uploadAvatar } from "@/api/user";
import AvatarUploader from "vue-plain-avatar-uploader";
import { base64ToFile } from "@/utils/base64-to-file";

export default {
  props: ["value", "user"],
  components: { AvatarUploader },
  data() {
    return {
      // indications
      indications: {
        warning: "",
        error: ""
      },
      warningAlert: false,
      errorAlert: false,
      // edit data
      editData: {},
      editing: false,
      roles: [],
      setAvatar: false
    };
  },
  watch: {
    value(val) {
      if (!val) {
        // 关闭时
        this.editData = {};
        this.$refs.form.resetValidation();
        this.errorAlert = false;
        this.warningAlert = false;
      } else {
        this.editData = JSON.parse(JSON.stringify(this.user));
      }
    }
  },
  computed: {
    modified() {
      return JSON.stringify(this.user) !== JSON.stringify(this.editData);
    }
  },
  async created() {
    this.roles = (await getRoles()).data;
  },
  methods: {
    async edit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.modified) {
          this.editing = true;
          if (this.editData["avatar"] != this.user["avatar"]) {
            this.$notify.info("上传头像..", true);
            const response = await uploadAvatar(
              base64ToFile(this.editData["avatar"])
            );
            if (response.status === 0) {
              this.$notify.success("头像已上传");
              setTimeout(() => {
                this.$notify.info("保存修改..", true);
                this.doEdit();
              }, 370);

              this.errorAlert = false;
            } else {
              this.indications.error = "上传图片异常，请稍后重试！";
              this.errorAlert = true;
            }
          } else {
            await this.doEdit();
          }
          this.editing = false;
        } else {
          this.$emit("input", false);
        }
      }
    },
    async doEdit() {
      const editData = JSON.parse(JSON.stringify(this.editData));
      editData["selectedroles"] = editData["roleIds"].join(",");
      delete editData["avatar"];
      await updateUser(this.user.id, editData);
      this.$notify.success("更新已保存");

      setTimeout(() => {
        this.$notify.info("重新加载用户列表..", true);
        this.$emit("reload");
      }, 800);
      this.$emit("input", false);
    },
    confirmAvatar(avatar) {
      this.editData["avatar"] = avatar;
      this.setAvatar = false;
    }
  }
};
</script>
