<template>
  <v-navigation-drawer
    absolute
    right
    temporary
    :value="value"
    width="300px"
    @input="(val) => $emit('input', val)"
  >
    <v-card flat>
      <v-card-title>设置</v-card-title>
      <v-divider />
      <v-card-subtitle> 主题色 </v-card-subtitle>
      <v-card-text>
        <v-color-picker
          hide-sliders
          hide-inputs
          dot-size="25"
          swatches-max-height="200"
        ></v-color-picker>
      </v-card-text>
      <v-card-subtitle> 深/浅 </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="pr-1">
            <v-card color="primary" dark>
              <v-card-text class="d-flex justify-space-between align-center">
                <span style="font-size: 18px">深</span>
                <v-icon>mdi-white-balance-sunny </v-icon>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" class="pl-1">
            <v-card>
              <v-card-text class="d-flex justify-space-between align-center">
                <span style="font-size: 18px">浅</span>
                <v-icon>mdi-weather-night </v-icon>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: ["value"]
};
</script>
