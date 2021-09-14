<template>
  <v-container fluid fill-height :class="['d-flex', { white: !$vuetify.theme.dark }]">
    <v-data-table
      style="width: 100%"
      :headers="headers"
      :items="users"
      class="align-self-stretch"
      :search="search"
      v-model="selected"
      show-select
      checkbox-color="primary"
      :loading="loading"
    >
      <!-- top actions -->
      <template #top>
        <v-toolbar flat dense>
          <v-btn color="primary" @click="createDialog = true"> 新增 </v-btn>
          <v-btn color="error" class="ml-1 ml-md-2" @click="deleteManyDialog = true" :disabled="selected.length === 0">
            删除
            <span v-if="selected.length > 0">({{ selected.length }}) </span>
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

      <!-- avatar -->
      <template #[`item.avatar`]="{ item }">
        <v-avatar size="32px">
          <v-img :src="item.avatar"></v-img>
        </v-avatar>
      </template>

      <!-- gender -->
      <template #[`item.gender`]="{ item: { gender } }">
        <span>
          {{ gender === 1 ? '男' : '女' }}
        </span>
      </template>

      <!-- roles -->
      <template #[`item.roleNames`]="{ item: { roleNames } }">
        <v-chip
          v-for="(i, idx) in roleNames ? roleNames.split(',').slice(0, 2) : []"
          :key="idx"
          small
          outlined
          color="primary"
          label
          class="mr-1"
        >
          <span>{{ i }}</span>
        </v-chip>
        <span class="grey--text text-caption" v-if="roleNames && roleNames.split(',').length > 2">
          (等{{ roleNames.split(',').length }}项)
        </span>
      </template>

      <!-- 状态 -->
      <template #[`item.status`]="{ item: { status } }">
        <v-badge inline :color="status == 1 ? 'success' : 'warning'" left dot style="font-size: 12px">
          {{ status == 1 ? '正常' : '冻结' }}
        </v-badge>
      </template>

      <!-- actions -->
      <template #[`item.actions`]="{ item }">
        <v-btn
          text
          color="primary"
          @click="
            editingUser = JSON.parse(JSON.stringify(item));
            editingUser['roleIds'] = item['roleIds'] ? item['roleIds'].split(',') : [];
            editDialog = true;
          "
          small
        >
          编辑
        </v-btn>
        <v-menu bottom offset-y>
          <template #activator="{ attrs, on }">
            <v-btn text color="primary" small v-bind="attrs" v-on="on"> 更多<v-icon small>mdi-chevron-down</v-icon> </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="resetDialog = true">
              <v-list-item-subtitle>重置密码</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              v-if="item.status == 1"
              @click="
                freezingUser = item;
                freezeDialog = true;
              "
            >
              <v-list-item-subtitle>冻结</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              v-else
              @click="
                activatingUser = item;
                activateDialog = true;
              "
            >
              <v-list-item-subtitle>激活</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              @click="
                deletingUser = item.id;
                deleteDialog = true;
              "
            >
              <v-list-item-subtitle class="red--text">删除</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <create-dialog v-model="createDialog" @reload="getUsers" />
    <edit-dialog v-model="editDialog" @reload="getUsers" :user="editingUser" />
    <freeze-dialog v-model="freezeDialog" :user="freezingUser" @reload="getUsers" />
    <activate-dialog v-model="activateDialog" :user="activatingUser" @reload="getUsers" />
    <reset-dialog v-model="resetDialog" :user="resetingUser" />
    <delete-dialog v-model="deleteDialog" :userId="deletingUser" @reload="getUsers" />
    <delete-many-dialog v-model="deleteManyDialog" :users="selected" @reload="getUsers" />
  </v-container>
</template>
<script>
import { getUsers } from '@/api/user';
import ActivateDialog from '@/components/management/user/ActivateDialog.vue';
import CreateDialog from '@/components/management/user/CreateDialog.vue';
import DeleteDialog from '@/components/management/user/DeleteDialog.vue';
import DeleteManyDialog from '@/components/management/user/DeleteManyDialog.vue';
import EditDialog from '@/components/management/user/EditDialog.vue';
import FreezeDialog from '@/components/management/user/FreezeDialog.vue';
import ResetDialog from '@/components/management/user/ResetDialog.vue';

export default {
  components: {
    CreateDialog,
    EditDialog,
    FreezeDialog,
    ResetDialog,
    DeleteDialog,
    ActivateDialog,
    DeleteManyDialog,
  },
  name: 'management-user',
  data() {
    return {
      headers: [
        { text: '用户名', value: 'username' },
        { text: '邮箱', value: 'email' },
        { text: '头像', value: 'avatar', sortable: false },
        { text: '性别', value: 'gender' },
        { text: '角色', value: 'roleNames', sortable: false },
        { text: '状态', value: 'status' },
        { text: '创建时间', value: 'createTime' },
        { text: '操作', value: 'actions', align: 'center', sortable: false },
      ],
      users: [],
      search: '',
      selected: [],
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
  methods: {
    async getUsers() {
      // 恢复一些状态
      this.selected = [];
      this.deletingUser = -1;
      this.editingUser = {};
      this.freezingUser = {};

      this.loading = true;
      this.users = (await getUsers()).data;
      this.loading = false;
    },
  },
};
</script>
