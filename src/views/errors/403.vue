<template>
  <v-layout flat fill-height class="col-12 d-flex align-center justify-center" style="background-color: #233a5f">
    <v-card class="pa-3" style="background-color: transparent; width: 404px" flat dark>
      <v-row>
        <v-col cols="6" class="d-flex justify-end">
          <div class="text-h1" style="color: #17263d; font-weight: 600">403</div>
        </v-col>
        <v-col class="d-flex align-center justify-start" cols="6">
          <div>
            <v-icon color="error" x-large>mdi-alert</v-icon>
            <div class="subtitle">无权访问 : (</div>
          </div>
        </v-col>
      </v-row>
      <v-btn to="/" color="primary" small class="ml-7 mt-4">返回</v-btn>
    </v-card>
  </v-layout>
</template>
