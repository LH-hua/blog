<template>
  <v-app-bar density="compact" flat>
    <top-menu></top-menu>
  </v-app-bar>

  <v-main>
    <div>
      <router-view></router-view>
    </div>
  </v-main>
  <v-footer flat class="bg-black" height="20">
    <div class="px-4 py-2 text-center w-100">{{ new Date().getFullYear() }} — LH</div>
  </v-footer>
</template>

<script setup>
// import cardImage from "@/components/cardImage.vue";
import topMenu from '@/components/topMenu.vue'

import { onMounted } from 'vue'
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  function handleScroll(event) {
    // 获取滚动的垂直距离
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const header = document.querySelector('.v-app-bar.v-toolbar')
    // 处理滚动事件
    console.log('滚动距离：', scrollTop)
    if (scrollTop > 5) {
      header.style.background = 'rgba(255, 255, 255, 0.5)'
      header.style.color = 'black'
      header.style.boxShadow = '0px 0px 10px rgba(255, 255, 255, 0.5)'
    } else {
      header.style.background = 'transparent'
      header.style.color = 'white'
      header.style.boxShadow = 'none'
    }
    console.log(event)
  }
})
</script>

<style>
.v-app-bar,
.v-toolbar {
  /* backdrop-filter: blur(10px); */
  /* border-bottom: 1px solid #e0e0e0; */
}
.v-app-bar.v-toolbar {
  background: transparent;
  backdrop-filter: blur(10px);
  color: white;
}
</style>
