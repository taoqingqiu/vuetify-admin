<template>
  <v-container
    fluid
    fill-height
    :class="['d-flex', { white: !$vuetify.theme.dark }]"
  >
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
      :height="tableHeight"
      class="align-self-stretch flex-grow-1"
      checkbox-color="primary"
      v-model="selectedItems"
      show-select
    >
      <!-- top toolbar -->
      <template #top>
        <v-toolbar flat dense>
          <v-btn color="primary" @click="createDialog = true"> 新增 </v-btn>
          <v-btn
            color="error"
            class="ml-1 ml-md-2"
            @click="deleteManyDialog = true"
            :disabled="selectedItems.length === 0"
          >
            删除
            <span v-if="selectedItems.length > 0"
              >({{ selectedItems.length }})
            </span>
          </v-btn>
          <v-spacer />
          <div style="width: 240px" class="ml-4 mmd-0">
            <v-text-field
              hide-details
              outlined
              single-line
              placeholder="输入关键词以筛选"
              dense
              v-model="search"
              clearable
              append-icon="mdi-magnify"
            />
          </div>
        </v-toolbar>
      </template>

      <!-- roles -->
      <template #[`item.roles`]="{ item: { roles } }">
        <v-chip
          v-for="(role, index) in roles.slice(0, 4)"
          :key="index"
          small
          outlined
          color="primary"
          label
          class="mr-1"
        >
          <span>{{ role.name }}</span>
        </v-chip>
        <tailed-tooltip top>
          <template #activator="{ on }">
            <span
              class="grey--text text-caption"
              v-if="roles.length > 4"
              v-on="on"
            >
              ({{ roles.length - 4 }}+)
            </span>
          </template>
          {{
            roles
              .slice(4)
              .map((r) => r.name)
              .join(",")
          }}
        </tailed-tooltip>
      </template>

      <!-- status -->
      <template #[`item.status`]="{ item: { status } }">
        <v-badge
          inline
          :color="status === 1 ? 'success' : 'warning'"
          left
          dot
          class="text-caption pr-4"
        >
          {{ status === 1 ? "正常" : "冻结" }}
        </v-badge>
      </template>

      <!-- actions -->
      <template #[`item.actions`]="{ item }">
        <v-btn
          text
          color="primary"
          @click="
            theItem = JSON.parse(JSON.stringify(item));
            theItem['roles'] = item['roles'].map((r) => r.id);
            editDialog = true;
          "
          small
        >
          编辑
        </v-btn>
        <v-btn
          text
          color="error"
          @click="
            {
            }
          "
          small
        >
          删除
        </v-btn>
      </template>
    </v-data-table>
    <create-dialog v-model="createDialog" @reload="getUsers" />
    <edit-dialog v-model="editDialog" @reload="getUsers" :item="theItem" />
    <delete-dialog
      v-model="deleteDialog"
      :userId="deletingUser"
      @reload="getUsers"
    />
    <delete-many-dialog
      v-model="deleteManyDialog"
      :users="selectedItems"
      @reload="getUsers"
    />
  </v-container>
</template>
<script>
import { getUsers } from "@/api/user";
import CreateDialog from "@/components/management/user/CreateDialog.vue";
import DeleteDialog from "@/components/management/user/DeleteDialog.vue";
import DeleteManyDialog from "@/components/management/user/DeleteManyDialog.vue";
import EditDialog from "@/components/management/user/EditDialog.vue";
import TailedTooltip from "@/components/TailedTooltip";

export default {
  components: {
    TailedTooltip,
    CreateDialog,
    EditDialog,
    DeleteDialog,
    DeleteManyDialog,
  },
  name: "management-user",
  data() {
    return {
      headers: [
        { text: "用户名", value: "username" },
        { text: "角色", value: "roles", sortable: false },
        { text: "状态", value: "status", align: "center" },
        { text: "操作", value: "actions", align: "center", sortable: false },
      ],
      items: [],
      search: "",
      selectedItems: [],
      theItem: null,
      loading: false,
      // pagination at server
      currPage: 1,
      pageSize: 10,
      itemsLength: 1,
      // in progress user
      editingUser: {},
      freezingUser: {},
      resetingUser: {},
      deletingUser: -1,
      activatingUser: {},
      // dialogs
      createDialog: false,
      editDialog: false,
      freezeDialog: false,
      resetDialog: false,
      deleteDialog: false,
      deleteManyDialog: false,
      activateDialog: false,
      // search
      searchData: {},
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    tableHeight() {
      return window.screen.height - 340;
    },
  },
  methods: {
    async getUsers() {
      // 恢复一些状态
      this.selectedItems = [];
      this.deletingUser = -1;
      this.editingUser = {};
      this.freezingUser = {};

      this.loading = true;
      this.items = (await getUsers()).data;
      this.loading = false;
    },
  },
};
</script>
