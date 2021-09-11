<template>
  <v-dialog :value="value" width="400px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 删除确认 </v-card-title>
      <v-card-text class="my-4">
        <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon>
        确认删除这个菜单？
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="deleteMenu" :loading="deleting">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { deleteMenus } from "../../../api/menu";

export default {
  props: ["value", "menuId"],
  data() {
    return {
      deleting: false
    };
  },
  methods: {
    async deleteMenu() {
      this.deleting = true;
      await deleteMenus([this.menuId]);
      this.deleting = false;
      this.$emit("input", false);
      this.$notify.success(`菜单已删除！`);
      this.$emit("after");
    }
  }
};
</script>
