<template>
  <div>
    <v-app-bar :elevation="2">
      <v-app-bar-title>龙华的博客</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer style="background-color: #f1f3f4" class="d-flex flex-column">
      <div>{{ new Date().getFullYear() }} — <strong>龙华</strong></div>
    </v-footer>
  </div>
</template>
