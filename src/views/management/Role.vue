<template>
  <v-container fluid fill-height :class="['d-flex', { white: !$vuetify.theme.dark }]">
    <v-col cols="12" md="3" class="d-flex align-self-stretch" ref="roles">
      <v-card style="width: 100%" flat outlined class="px-2">
        <v-card-title>
          <v-btn color="primary" small @click="createDialog = true"> 新增 </v-btn>
          <v-btn color="primary" small @click="editDialog = true" class="ml-1 ml-md-2"> 编辑 </v-btn>
          <v-btn color="error" class="ml-1 ml-md-2" small :disabled="selectedRoles.length === 0" @click="deleteDialog = true">
            删除
            <span v-if="selectedRoles.length > 0">({{ selectedRoles.length }}) </span>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-title class="pa-0">
          <v-toolbar flat>
            <v-text-field
              v-model="keyword"
              solo
              flat
              dense
              outlined
              append-icon="mdi-magnify"
              label="输入关键词以筛选"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-list dense nav>
            <v-list-item-group color="primary" mandatory v-model="activeRole">
              <v-list-item v-for="(role, index) in roles" :key="index">
                <v-list-item-action>
                  <v-checkbox color="primary" @click.stop.prevent="selectRole(role.id)" :input-value="selectedRoles.includes(role.id)" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="`${role.name} (${role.symbol})`"> {{ role.name }} ({{ role.symbol }}) </v-list-item-title>
                  <v-list-item-subtitle>{{ role.description || '暂无描述~' }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-overlay absolute v-if="loadingRoles" opacity=".07">
            <v-alert color="primary" text>
              <v-progress-circular indeterminate />
            </v-alert>
          </v-overlay>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="9" class="d-flex align-self-stretch">
      <v-card style="width: 100%" flat outlined class="pb-10">
        <v-card-title class="text-subtitle-1 mx-2">
          授权
          <v-spacer />
          类型
        </v-card-title>
        <v-divider class="mx-2" />
        <v-treeview
          hoverable
          :items="menus"
          color="primary"
          open-on-click
          class="py-2 px-2"
          selectable
          selected-color="primary"
          v-model="authorized"
        >
          <template #append="{ item: { type } }">
            <v-chip small label>{{ type == 1 ? '一级菜单' : type == 2 ? '子菜单' : '操作' }}</v-chip>
          </template>
        </v-treeview>
        <v-toolbar style="width: 100%" flat bottom absolute>
          <v-btn small color="primary" @click="authorizeAll"> 全选 </v-btn>
          <v-btn small class="ml-2" :disabled="!modified" color="primary" @click="saveAuthority" :loading="savingAuthorities"> 保存 </v-btn>
          <v-btn small class="ml-2" :disabled="!modified" color="error" @click="resetAuthority"> 重置 </v-btn>
        </v-toolbar>
        <v-overlay absolute v-if="loadingMenus" opacity=".07">
          <v-alert color="primary" text>
            <v-progress-circular indeterminate />
          </v-alert>
        </v-overlay>
      </v-card>
    </v-col>
    <create-dialog v-model="createDialog" :menus="menus" @reload="getRoles" />
    <delete-dialog v-model="deleteDialog" :roles="selectedRoles" @reload="getRoles" />
    <edit-dialog v-model="editDialog" :role="roles[activeRole]" @reload="getRoles" />
  </v-container>
</template>
<script>
import { getMenuTree } from '../../api/menu';
import { getAuthorizedMenus, getRoles, updateRoleAuthorities } from '../../api/role';
import DeleteDialog from '../../components/management/role/DeleteDialog.vue';
import CreateDialog from '../../components/management/role/CreateDialog.vue';
import { getParentNode, flattenMenuTree } from '../../utils/tree-util';
import EditDialog from '../../components/management/role/EditDialog.vue';

export default {
  name: 'management-role',
  components: { CreateDialog, DeleteDialog, EditDialog },
  data() {
    return {
      // roles
      activeRole: '',
      roles: [],
      selectedRoles: [],
      // tree related
      authorized: [],
      authorizedOrigin: [],
      menus: [],
      // loading
      loadingRoles: false,
      loadingMenus: false,
      savingAuthorities: false,
      // dialogs
      createDialog: false,
      deleteDialog: false,
      editDialog: false,
      // search
      rolesQuantity: [],
      keyword: '',
    };
  },
  mounted() {
    // vuetify 会调整布局，所以延时 200ms 再获取 height
    // 而为了获取到 flex 布局自动撑满的 height，需要在获取 maxHeight 之后才获取所有角色、菜单树
    setTimeout(() => {
      this.getRoles();
      this.getMenuTree();
    }, 200);
  },
  watch: {
    activeRole(val) {
      this.getAuthorizedMenus(this.roles[val].id);
    },
    keyword(val) {
      if (val === null) {
        this.roles = JSON.parse(JSON.stringify(this.rolesQuantity));
      } else {
        this.filterRole(val);
      }
    },
    roles(val) {
      this.selectedRoles = this.selectedRoles.filter(sr => val.some(r => r.id === sr));
    },
  },
  computed: {
    modified() {
      return JSON.stringify(this.authorized) !== this.authorizedOrigin;
    },
  },
  methods: {
    /**
     * 由于 treeview 的选择模式为 ‘leaf’
     * 故需要从已授权菜单中，去掉所有“父”节点（不然由于选种模式，其下所有节点都处于 checked 状态）
     */
    compressAuthorized(authorizedArr) {
      let resultArr = [...authorizedArr];
      authorizedArr.forEach(ar => {
        const parent = getParentNode(this.menus, ar);
        parent && (resultArr = resultArr.filter(r => r !== parent.id));
      });
      return resultArr;
    },
    expandAuthorized(authorizedArr) {
      let resultArr = [...authorizedArr];
      authorizedArr.forEach(ar => {
        const parent = getParentNode(this.menus, ar);
        if (parent) {
          resultArr.push(...this.expandAuthorized([parent.id]));
        }
      });

      resultArr = [...new Set(resultArr)];

      return resultArr;
    },
    authorizeAll() {
      this.authorized = this.compressAuthorized(flattenMenuTree(this.menus, 'id'));
    },
    async saveAuthority() {
      this.savingAuthorities = true;
      const expandedArr = this.expandAuthorized(this.authorized);
      await updateRoleAuthorities(this.roles[this.activeRole].id, expandedArr);
      this.authorizedOrigin = JSON.stringify(this.authorized);
      this.savingAuthorities = false;

      // notify
      this.$notify.success('权限已保存！');
    },
    resetAuthority() {
      this.authorized = JSON.parse(this.authorizedOrigin);
    },
    selectRole(roleId) {
      if (this.selectedRoles.includes(roleId)) {
        this.selectedRoles = this.selectedRoles.filter(sr => sr !== roleId);
      } else {
        this.selectedRoles.push(roleId);
      }
    },
    async getRoles() {
      this.loadingRoles = true;
      this.roles = (await getRoles()).data;
      this.rolesQuantity = JSON.parse(JSON.stringify(this.roles));

      // selected 中，已然不再的角色要滤掉
      const allRoles = this.roles.map(r => r.id);
      this.selectedRoles = this.selectedRoles.filter(sr => allRoles.includes(sr));
      this.loadingRoles = false;
    },
    async getMenuTree() {
      this.loadingMenus = true;
      this.menus = (await getMenuTree()).data;
      this.loadingMenus = false;
    },
    async getAuthorizedMenus(roleId) {
      this.loadingMenus = true;
      this.authorized = this.compressAuthorized((await getAuthorizedMenus(roleId)).data);

      // 实践表明，初始时，直接连续赋值这二位
      // 会影响 computed - modified 的计算结果，故 nextTick
      this.$nextTick(() => {
        this.authorizedOrigin = JSON.stringify(this.authorized);
      });

      this.loadingMenus = false;
    },
    /**
     * 筛选角色
     */
    filterRole(keyword) {
      this.roles = this.rolesQuantity.filter(r => (r.roleName + r.description + r.roleCode).includes(keyword));
    },
  },
};
</script>
