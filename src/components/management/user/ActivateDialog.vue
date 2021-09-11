<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 激活确认 </v-card-title>
      <v-card-text class="my-4">
        <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon>
        确认激活用户 {{ user.username }}？
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="activate" :loading="activating">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { activateUser } from "../../../api/user";

export default {
  props: ["value", "user"],
  data() {
    return {
      activating: false
    };
  },
  methods: {
    async activate() {
      this.activating = true;
      await activateUser(this.user.id);
      this.activating = false;
      this.$emit("input", false);
      this.$notify.success(`用户已激活！`);
      setTimeout(() => {
        this.$notify.info("重新加载角色列表..", true);
        this.$emit("reload");
      }, 800);
    }
  }
};
</script>
