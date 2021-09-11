<template>
  <v-navigation-drawer :mini-variant="mini" v-model="$store.state.app.navDrawer" clipped app>
    <v-list nav dense expand>
      <template v-for="(item, index) in $store.state.user.menus.concat().sort((a, b) => a.order - b.order)">
        <v-list-item :to="item.path" :key="index" v-if="!item.children">
          <v-list-item-icon v-if="!mini">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <tailed-tooltip v-else right>
            <template #activator="{ attrs, on }">
              <v-list-item-icon v-on="on" v-bind="attrs">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ item.name }} </span>
          </tailed-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-else>
          <v-list-group :key="index" :prepend-icon="item.icon" no-action v-if="!mini" :value="true">
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-for="(i, idx) in item.children.concat().sort((a, b) => a.order - b.order)">
              <v-list-item :key="idx" :to="i.path" v-if="!i.children">
                <v-list-item-title>{{ i.name }}</v-list-item-title>
              </v-list-item>
              <v-list-group v-else :key="idx" no-action sub-group>
                <template #activator>
                  <v-list-item-title>{{ i.name }}</v-list-item-title>
                </template>
                <v-list-item :key="_idx" :to="_i.path" v-for="(_i, _idx) in i.children.concat().sort((a, b) => a.order - b.order)">
                  <v-list-item-title>{{ _i.name }}</v-list-item-title>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list-group>
          <v-menu :key="index" v-else offset-x close-delay="500" open-delay="500" v-model="secondMenu[index]">
            <template #activator="{ attrs, on }">
              <v-list-item>
                <v-list-item-icon v-bind="attrs" v-on="on">
                  <tailed-tooltip right v-model="tooltip[index]">
                    <template #activator="{ attrs: _attrs, on: _on }">
                      <v-icon
                        :color="$route.path.includes(item.path) ? 'primary' : ''"
                        v-bind="_attrs"
                        v-on="_on"
                        @click="tooltip[index] = false"
                        >{{ item.icon }}</v-icon
                      >
                    </template>
                    {{ item.name }}
                  </tailed-tooltip>
                </v-list-item-icon>
              </v-list-item>
            </template>
            <v-list :key="idx" v-for="(i, idx) in item.children.concat().sort((a, b) => a.order - b.order)">
              <v-list-item :to="i.path" v-if="!i.children">
                <v-list-item-title>{{ i.name }}</v-list-item-title>
              </v-list-item>
              <v-menu :key="idx" v-else offset-x close-delay="500" open-delay="500" @input="val => !val && (secondMenu[index] = false)">
                <template #activator="{ attrs, on }">
                  <v-list-item v-bind="attrs" v-on="on">
                    {{ i.name }}
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-list-item>
                </template>
                <v-list :key="_idx" v-for="(_i, _idx) in i.children.concat().sort((a, b) => a.order - b.order)">
                  <v-list-item :to="_i.path">
                    <v-list-item-title>{{ _i.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list>
          </v-menu>
        </template>
      </template>
    </v-list>

    <!-- lg、xl 时 nav drawer 固定在左侧，此时提供折叠功能 -->
    <template #append class="d-none">
      <div class="d-none d-lg-block d-xl-block">
        <v-divider />
        <v-btn block @click="mini = !mini" text>
          <v-icon>{{ mini ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left' }}</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  components: {
    TailedTooltip: () => import('@/components/TailedTooltip.vue'),
  },
  data: () => ({
    mini: false,
    secondMenu: {},
    tooltip: {},
  }),
};
</script>
