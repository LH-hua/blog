<template>
  <v-app>
    <router-view></router-view>
    <div style="position: absolute;z-index: 9999;width: 1000px;height: 100px;" id="app3"></div>
  </v-app>
</template>

<script setup>
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
