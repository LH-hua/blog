<template>
  <v-app>
    <router-view></router-view>
    <alter></alter>
  </v-app>
</template>

<script setup>
import alter from './components/alter/alter.vue'
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
