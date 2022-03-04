<template>
  <v-dialog :value="value" width="300px" persistent>
    <v-card>
      <v-card-title> 删除确认 </v-card-title>
      <v-card-text class="my-4">
        <v-icon color="warning" class="mr-1">mdi-alert-circle</v-icon>
        确认删除这个用户?
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
import { deleteUsers } from "@/api/user";

export default {
  props: ["value", "item"],
  data() {
    return {
      submitting: false,
    };
  },
  methods: {
    async submit() {
      this.submitting = true;
      await deleteUsers([this.item.id]);
      this.submitting = false;
      this.$emit("input", false);

      this.$notify.success(`已删除!`);
      setTimeout(() => {
        this.$notify.info("重载列表..", true);
        this.$emit("reload");
      }, 800);
    },
  },
};
</script>
