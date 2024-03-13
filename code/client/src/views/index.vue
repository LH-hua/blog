
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log(11)
})
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar" flat></v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- <v-footer class="bg-indigo-lighten-1 text-center">
    <v-divider></v-divider>
    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer> -->
  </v-layout>
</template>

<style scoped>
.main{
  width: 50%;
  margin: 0 auto;
}
</style>
