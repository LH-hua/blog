<template>
  <v-app-bar class="custom" density="compact" flat style="position: static">
    <navigation></navigation>
  </v-app-bar>

  <v-main>
    <div class="main">
      <router-view></router-view>
    </div>
  </v-main>
  <!-- <my-footer></my-footer> -->
</template>

<script setup>
// import cardImage from "@/components/cardImage.vue";
import navigation from '@/components/navigation.vue'
import myFooter from '@/components/footer.vue'
import { Scroll } from '@/utils/tool'

import { onMounted } from 'vue'

const scroll = new Scroll()
onMounted(() => {
  // scroll.loading()
})
</script>

<style>
.v-app-bar,
.v-toolbar {
  /* backdrop-filter: blur(10px); */
  border-bottom: 1px solid #e0e0e0;
}
.main {
  /* background: white; */
}
/* .v-app-bar.v-toolbar {
  background: transparent;
  backdrop-filter: blur(10px);
  color: white;
} */
</style>
