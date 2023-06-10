<template>
  <v-app-bar flat>
    <top-menu></top-menu>
  </v-app-bar>

  <v-main class="bg-grey-lighten-3">
    <router-view></router-view>
  </v-main>
  <v-footer flat class="bg-black" height="20">
    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — LH
    </div>
  </v-footer>
</template>

<script setup>
import cardImage from "@/components/cardImage.vue";
import topMenu from "@/components/topMenu.vue";

import { onMounted } from "vue";
onMounted(() => {});
</script>
