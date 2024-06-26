<template>
  <v-app-bar class="custom" density="compact">
    <top-menu></top-menu>
  </v-app-bar>

  <v-main>
    <div>
      <router-view></router-view>
    </div>
  </v-main>
  <!-- <v-footer flat class="bg-black" height="20">
    <div class="px-4 py-2 text-center w-100">{{ new Date().getFullYear() }} — LH</div>
  </v-footer> -->
</template>

<script setup>
// import cardImage from "@/components/cardImage.vue";
import topMenu from '@/components/topMenu.vue'
import { Scroll } from '@/utils/tool'

import { onMounted } from 'vue'

const scroll = new Scroll()
onMounted(() => {
  scroll.loading()
})
</script>

<style>
.v-app-bar,
.v-toolbar {
  /* backdrop-filter: blur(10px); */
  /* border-bottom: 1px solid #e0e0e0; */
}
/* .v-app-bar.v-toolbar {
  background: transparent;
  backdrop-filter: blur(10px);
  color: white;
} */
</style>
