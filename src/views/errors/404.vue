<template>
  <v-layout flat fill-height class="col-12 d-flex align-center justify-center" style="background-color: #233a5f">
    <v-card class="pa-3" style="background-color: transparent; width: 404px" flat dark>
      <v-row>
        <v-col cols="6" class="d-flex justify-end">
          <div class="text-h1" style="color: #17263d; font-weight: 600">404</div>
        </v-col>
        <v-col class="d-flex align-center justify-start" cols="6">
          <div>
            <v-icon color="warning" x-large>mdi-alert</v-icon>
            <div class="subtitle">页面不存在 : (</div>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn to="/" color="primary" class="mt-3">返回</v-btn>
      </v-row>
    </v-card>
  </v-layout>
</template>
