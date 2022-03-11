<template>
  <v-container fluid fill-height class="flex-column" :class="['d-flex']">
    <v-card flat class="d-flex align-center mb-2 px-4 py-2" width="100%">
      <v-btn color="primary" small @click="createDialog = true"> New </v-btn>
      <v-btn
        color="error"
        small
        class="ml-1 ml-md-2"
        @click="deleteManyDialog = true"
        :disabled="selectedItems.length === 0"
      >
        Delete
        <span v-if="selectedItems.length > 0">
          ({{ selectedItems.length }})
        </span>
      </v-btn>
      <v-spacer />
      <div style="width: 240px" class="ml-4 mmd-0">
        <v-text-field
          hide-details
          single-line
          placeholder="Filter by keyword"
          dense
          v-model="search"
          clearable
          append-icon="mdi-magnify"
        />
      </div>
    </v-card>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
      :height="tableHeight"
      class="align-self-stretch flex-grow-1 border-radius-table"
      checkbox-color="primary"
      v-model="selectedItems"
      show-select
    >
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
              .join(", ")
          }}
        </tailed-tooltip>
      </template>

      <!-- state -->
      <template #[`item.state`]="{ item: { state } }">
        <v-badge
          inline
          :color="state === 1 ? 'success' : 'warning'"
          left
          dot
          class="text-caption pr-4"
        >
          {{ state === 1 ? "Normal" : "Frozen" }}
        </v-badge>
      </template>

      <!-- actions -->
      <template #[`item.actions`]="{ item }">
        <v-btn
          text
          color="primary"
          @click="
            selectedItem = JSON.parse(JSON.stringify(item));
            selectedItem['roles'] = item['roles'].map((r) => r.id);
            editDialog = true;
          "
          small
        >
          Edit
        </v-btn>
        <v-btn
          text
          color="error"
          @click="
            selectedItem = item;
            deleteDialog = true;
          "
          small
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
    <create-dialog v-model="createDialog" @reload="getUsers" />
    <edit-dialog v-model="editDialog" @reload="getUsers" :item="selectedItem" />
    <delete-dialog
      v-model="deleteDialog"
      :item="selectedItem"
      @reload="getUsers"
    />
    <delete-many-dialog
      v-model="deleteManyDialog"
      :items="selectedItems"
      @reload="getUsers"
    />
  </v-container>
</template>
<script>
import { getUsers } from "@/api/user";
import CreateDialog from "@/components/system/user-management/CreateDialog.vue";
import DeleteDialog from "@/components/system/user-management/DeleteDialog.vue";
import DeleteManyDialog from "@/components/system/user-management/DeleteManyDialog.vue";
import EditDialog from "@/components/system/user-management/EditDialog.vue";
import TailedTooltip from "@/components/TailedTooltip";

export default {
  components: {
    TailedTooltip,
    CreateDialog,
    EditDialog,
    DeleteDialog,
    DeleteManyDialog,
  },
  name: "UserManagement",
  data() {
    return {
      headers: [
        { text: "Username", value: "username" },
        { text: "Roles", value: "roles", sortable: false },
        { text: "State", value: "state", align: "center" },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
      items: [],
      search: "",
      selectedItems: [],
      selectedItem: null,
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
      deleteDialog: false,
      deleteManyDialog: false,
      // search
      searchData: {},
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    tableHeight() {
      return window.screen.height - 350;
    },
  },
  methods: {
    async getUsers() {
      // reset
      this.selectedItems = [];
      this.deletingUser = -1;
      this.editingUser = {};
      this.freezingUser = {};

      this.loading = true;
      this.items = (await getUsers()).result;
      this.loading = false;
      await this.$store.dispatch("app/dismissNotification");
    },
  },
};
</script>
