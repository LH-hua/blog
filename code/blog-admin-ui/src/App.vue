<template>
  <v-app class="scroll-hidden app-bg">
    <router-view></router-view>
    <alter></alter>
  </v-app>
</template>

<script setup>
import alter from './components/alter/alter.vue'
</script>

<style scoped>
.app-bg {
  background-image: url('./assets/image/logo-bg.jpg');
  background-size: cover;
}
</style>
<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
