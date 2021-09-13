<template>
  <v-dialog :value="value" width="600px" persistent>
    <v-card>
      <v-card-title class="text-h5"> 新增一级菜单 </v-card-title>
      <v-card-text>
        <v-alert text type="warning" icon="mdi-alert-circle" dismissible close-icon="mdi-close" v-model="warningAlert">{{
          indications.warning
        }}</v-alert>
        <v-alert text type="error" icon="mdi-alert" dismissible close-icon="mdi-close" v-model="errorAlert">{{
          indications.error
        }}</v-alert>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-menu offset-y max-width="600px" v-model="selectIconMenu">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-on="on"
                    v-bind="attrs"
                    label="图标*"
                    required
                    v-model="createData['icon']"
                    :rules="[value => !!value || '图标不可为空']"
                  >
                    <template #prepend-inner>
                      <v-icon v-if="createData['icon']">{{ createData['icon'] }}</v-icon>
                    </template>
                  </v-text-field>
                </template>
                <v-card flat @click.stop.native>
                  <icon-picker v-model="createData['icon']" />
                </v-card>
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="名称*"
                required
                v-model="createData['name']"
                :rules="[value => !!value || '名称不可为空']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="前端路由*"
                required
                v-model="createData['path']"
                :rules="[value => !!value || '前端路由不可为空']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="顺序*"
                type="number"
                required
                v-model="createData['order']"
                :rules="[value => !!value || '顺序不可为空']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('input', false)"> 取消 </v-btn>
        <v-btn color="primary" @click="create" :loading="creating"> 确认 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { createMenu } from '../../../api/menu';
import IconPicker from 'vuetify-icon-picker';

export default {
  components: { IconPicker },
  props: ['value'],
  data() {
    return {
      // indications
      indications: {
        warning: '',
        error: '',
      },
      warningAlert: false,
      errorAlert: false,
      // create data
      createData: {},
      creating: false,
      // select icon menu
      selectIconMenu: false,
    };
  },
  watch: {
    value(val) {
      if (!val) {
        // 关闭时
        this.createData = {};
        this.$refs.form.resetValidation();
      }
    },
  },
  methods: {
    async create() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.creating = true;
        const createData = {
          ...this.createData,
          type: 1,
        };

        await createMenu(createData);
        this.$notify.success('菜单已新建');

        this.$emit('after');
        this.$emit('input', false);
        this.creating = false;
      }
    },
    selectIcon(icon) {
      this.$set(this.createData, 'icon', icon);
    },
    cancelSelectIcon() {
      this.createData['icon'] = '';
      this.selectIconMenu = false;
    },
    confirmSelectIcon() {
      this.selectIconMenu = false;
    },
  },
};
</script>
