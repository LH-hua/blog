<template>
  <v-app class="scroll-hidden app-bg">
    <router-view></router-view>
  </v-app>
</template>

<script setup>
</script>

<style scoped>
.app-bg {
  /* background-image: url('./assets/image/logo-bg.jpg'); */
  /* background-size: cover; */
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
