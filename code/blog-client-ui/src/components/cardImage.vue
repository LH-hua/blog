<template>
  <v-card flat>
    <v-card-title>
      <div style="width: 100%; height: 100px; display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 14px">
        <v-avatar size="100" :image="data.userData.cover"></v-avatar>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-center">
        <span>{{ data.userData.name }}</span>
      </div>
      <div class="d-flex justify-center">
        <span>{{ data.userData.about }}</span>
      </div>
      <div class="d-flex justify-center">
        <v-chip class="ma-2" label size="small"> 文章： {{ data.userData.post }}</v-chip>
        <v-chip class="ma-2" label size="small"> 标签： {{ data.userData.tags }}</v-chip>
      </div>
    </v-card-text>
    <template v-slot:actions>
      <div style="margin: 0 auto">
        <v-btn density="compact" v-for="item in data.userData.conact" :key="item.name" :icon="item.icon" @click="go(item.url)"> </v-btn>
        <!-- <v-icon>{{ item.icon }}</v-icon> -->
        <!-- <v-btn density="compact" icon="mdi-account" @click="onAbort"> </v-btn> -->
      </div>
    </template>
  </v-card>
  <!-- <v-navigation-drawer v-model="data.drawer" temporary>
    <v-list>
      <v-list-item prepend-avatar="/avatar/default.jpg" title="LH-hua"></v-list-item>
      <v-list-item> 众生皆草木，唯你是青山。 </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-email" title="huaker_hk@163.com"></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-qqchat" title="1589715612"></v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer> -->
</template>

<script setup>
import { reactive,onBeforeMount } from 'vue'
import {userRoot} from '@/http/root'
const data = reactive({ drawer: false,userData:{} })

function onAbort() {
  data.drawer = !data.drawer
}
function go(url) {
  window.open(url)
}

onBeforeMount(() => {
  userRoot().then(res => {
    data.userData = res.data
  })
})
</script>
