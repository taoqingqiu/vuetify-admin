<template>
  <v-container fluid fill-height class="d-flex white">
    <v-data-table
      style="width: 100%"
      :headers="headers"
      :items="menus"
      class="align-self-stretch"
      v-model="selected"
      show-select
      :loading="loading"
      :items-per-page="-1"
      hide-default-footer
      disable-sort
    >
      <!-- top actions -->
      <template #top>
        <v-toolbar flat>
          <v-btn color="primary" @click="createRootDialog = true"> 新增 </v-btn>
          <v-btn color="error" class="ml-1 ml-md-2" :disabled="selected.length === 0" @click="deleteManyDialog = true">
            删除
            <span v-if="selected.length > 0">({{ selected.length }}) </span>
          </v-btn>
          <v-spacer />
        </v-toolbar>
      </template>

      <!-- name -->
      <template #[`item.name`]="{ item: { name, isLeaf, level }, index }">
        <div>
          <span v-for="i in level - 1" :key="i" class="ml-8"></span>
          {{ name }}
          <v-btn v-if="!isLeaf" icon @click="openMenu(index)" small class="px-0">
            <v-icon>{{ openedMenus.includes(name) ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
          </v-btn>
        </div>
      </template>

      <!-- icon -->
      <template #[`item.icon`]="{ item: { icon, level } }">
        <v-icon v-if="level === 1">{{ icon }}</v-icon>
      </template>

      <!-- type -->
      <template #[`item.type`]="{ item: { type } }">
        <v-chip small outlined color="primary" label>
          {{ type === 1 ? '一级菜单' : type === 2 ? '子菜单' : '操作' }}
        </v-chip>
      </template>

      <!-- actions -->
      <template #[`item.actions`]="{ item: { level, key }, index }">
        <v-btn
          text
          color="primary"
          @click="
            editingMenuIndex = index;
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
            <v-list-item
              v-if="level <= 3"
              @click="
                creatingChildMenuIndex = index;
                createChildDialog = true;
              "
            >
              <v-list-item-subtitle>添加下级</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              @click="
                deletingMenu = key;
                deleteSingleDialog = true;
              "
            >
              <v-list-item-subtitle class="red--text">删除</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <create-root-dialog v-model="createRootDialog" @after="updateMenus" />
    <create-child-dialog v-model="createChildDialog" @after="afterAdd" :parent="creatingChildMenu" />
    <edit-dialog v-model="editDialog" @after="afterEdit" :menu="editingMenu" />
    <delete-single-dialog v-model="deleteSingleDialog" @after="afterDeleteSingle" :menuId="deletingMenu" />
    <delete-many-dialog v-model="deleteManyDialog" @after="afterDeleteMany" :menus="selected" />
  </v-container>
</template>
<script>
import { getMenus, getMenuTree } from '../../api/menu';
import CreateChildDialog from '../../components/management/menu/CreateChildDialog.vue';
import CreateRootDialog from '../../components/management/menu/CreateRootDialog.vue';
import DeleteManyDialog from '../../components/management/menu/DeleteManyDialog.vue';
import DeleteSingleDialog from '../../components/management/menu/DeleteSingleDialog.vue';
import EditDialog from '../../components/management/menu/EditDialog.vue';
import { getChildren, getNodeByName } from '../../utils/tree-util';

export default {
  components: {
    CreateRootDialog,
    CreateChildDialog,
    EditDialog,
    DeleteSingleDialog,
    DeleteManyDialog,
  },
  name: 'management-menu',
  data() {
    return {
      headers: [
        { text: '名称', value: 'name' },
        { text: '类型', value: 'type', align: 'center' },
        { text: '图标', value: 'icon' },
        { text: '路由/标识', value: 'path' },
        { text: '顺序', value: 'order' },
        { text: '操作', value: 'actions', align: 'center', sortable: false },
      ],
      menus: [],
      menuTree: null,
      search: '',
      selected: [],
      loading: false,
      openedMenus: [],
      // create child menu
      creatingChildMenuIndex: -1,
      onlyCreatingAction: false,
      // edit
      editingMenuIndex: -1,
      //delete
      deletingMenu: -1,
      // dialogs
      createRootDialog: false,
      createChildDialog: false,
      editDialog: false,
      deleteSingleDialog: false,
      deleteManyDialog: false,
    };
  },
  computed: {
    creatingChildMenu() {
      return this.creatingChildMenuIndex > -1 ? this.menus[this.creatingChildMenuIndex] : null;
    },
    editingMenu() {
      return this.editingMenuIndex > -1 ? this.menus[this.editingMenuIndex] : null;
    },
  },
  created() {
    this.getMenus();
    this.getMenuTree();
  },
  methods: {
    async getMenus() {
      this.loading = true;
      this.menus = (await getMenus()).data.map(t => ({ ...t, level: 1 }));
      this.loading = false;
    },
    async getMenuTree() {
      this.menuTree = (await getMenuTree()).data;
    },
    /**
     * 打开某个有子节点的菜单项。
     *
     * 当传入 menus 时，“打开”操作将发生在 menus，
     * 这样是为了能够用在重新加载时，一次性打开所有的已打开菜单。
     */
    openMenu(index, menus = null) {
      const targetMenus = menus ? menus : this.menus;
      const targetMenu = targetMenus[index];
      if (this.openedMenus.includes(targetMenu.name)) {
        this.openedMenus = this.openedMenus.filter(om => om !== targetMenu.name);
        let lastChildren = index + 1;
        const childrenLevel = targetMenus[lastChildren].level;
        for (; lastChildren < targetMenus.length; lastChildren++) {
          if (targetMenus[lastChildren].level < childrenLevel) {
            break;
          } else if (this.openedMenus.includes(targetMenus[lastChildren].name)) {
            this.openedMenus = this.openedMenus.filter(om => om !== targetMenus[lastChildren].name);
          }
        }
        targetMenus.splice(index + 1, lastChildren - 1 - index);
      } else {
        const childrenMenus = getChildren(this.menuTree, targetMenu.id);
        targetMenus.splice(index + 1, 0, ...childrenMenus.map(cm => ({ ...cm, level: targetMenu.level + 1 })));
        this.openedMenus.push(targetMenu.name);
      }
    },
    async afterAdd() {
      if (!this.openedMenus.includes(this.creatingChildMenu.name)) {
        this.openedMenus.push(this.creatingChildMenu.name);
      }
      await this.updateMenus();
      this.creatingChildMenuIndex = -1;
    },
    afterEdit() {
      this.editingMenuIndex = -1;
      this.updateMenus();
    },
    afterDeleteSingle() {
      this.deletingMenu = -1;
      this.updateMenus();
    },
    afterDeleteMany() {
      this.selected = [];
      this.updateMenus();
    },
    /**
     * 用于操作菜单后，更新当前菜单列表。
     * 不同于 getMenus，此函数会考虑当前打开的菜单，并恢复打开状态。
     */
    async updateMenus() {
      const menus = (await getMenus()).result.map(t => ({ ...t, level: 1 }));
      await this.getMenuTree();

      // 备份后重置已打开菜单
      let openedMenus = [...this.openedMenus];
      this.openedMenus = [];

      // 重新打开
      openedMenus = openedMenus
        .map(om => getNodeByName(this.menuTree, om))
        .filter(m => m)
        .sort((a, b) => a.menuType - b.menuType);

      openedMenus.forEach(om => {
        if (!om.isLeaf) {
          const targetIndex = menus.reduce((pre, curr, idx) => (curr.key === om.key ? idx : pre), 0);
          this.openMenu(targetIndex, menus);
        }
      });

      // 完成打开后，一下子更新 this.menus
      this.menus = menus;
    },
  },
};
</script>
