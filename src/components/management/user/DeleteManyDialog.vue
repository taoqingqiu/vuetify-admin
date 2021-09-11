<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 删除确认 </v-card-title>
      <v-card-text class="my-4">
        <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon>
        确认删除这 {{ users.length }} 个用户？
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="deleteUsers" :loading="deleting">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { deleteUsers } from "../../../api/user";

export default {
  props: ["value", "users"],
  data() {
    return {
      deleting: false
    };
  },
  methods: {
    async deleteUsers() {
      this.deleting = true;
      await deleteUsers(this.users.map((u) => u.id));
      this.deleting = false;
      this.$emit("input", false);
      this.$notify.success(`${this.users.length} 个用户已删除！`);
      setTimeout(() => {
        this.$notify.info("重新加载角色列表..", true);
        this.$emit("reload");
      }, 800);
    }
  }
};
</script>
