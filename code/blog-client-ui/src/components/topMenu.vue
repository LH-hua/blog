<template>
  <v-container class="d-flex align-center">
    <div
      class="font-weight-bold"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        text-align: center;
        border-radius: 50%;
        background-image: linear-gradient(120deg, rgb(161, 196, 253) 0%, rgb(194, 233, 251) 100%);
      "
    >
      LH
    </div>
    <v-spacer></v-spacer>
    <v-btn v-for="item in store.menu" :key="item.url" variant="text" @click="onTorouter(item)">
      <v-icon :icon="item.icon" />
      {{ item.name }}
    </v-btn>
    <!-- <userMenu v-if="user.userStatus"></userMenu>
    <div v-else style="cursor: pointer" color="grey-darken-1" @click="onDialogShow">登 录</div> -->
    <v-dialog v-model="store.dialog" width="1024">
      <login v-if="store.login" @close="close"></login>
      <!-- <regsite v-else></regsite> -->
    </v-dialog>
  </v-container>
</template>

<script setup>
import { reactive, defineEmits, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// components
import login from '@/components/user/login.vue'
import userMenu from './user/userMenu.vue'
// import regsite from "@/components/user/regsite.vue";

// pinia

import { userInfo } from '../store/userStore'

const store = reactive({
  menu: [
    {
      id: '0',
      pid: '0',
      icon: 'mdi-home-outline',
      name: '主 页',
      url: '/',
      tag: false,
      children: [],
    },
    {
      id: '0',
      pid: '0',
      icon: 'mdi-home-outline',
      name: '文 章',
      url: 'post/list',
      tag: false,
      children: [],
    },
    {
      id: '0',
      pid: '0',
      icon: 'mdi-bookmark-box-multiple',
      name: '分类',
      url: '/post/book',
      tag: false,
      children: [],
    },
    {
      id: '1',
      pid: '0',
      icon: 'mdi-compass-rose',
      name: '案列展示',
      url: '/preject',
      tag: false,
      children: [],
    },
    // {
    //   id: '1',
    //   pid: '0',
    //   icon: 'mdi-home',
    //   name: '室内场景',
    //   url: '/indoors',
    //   tag: true,
    //   children: [],
    // },
    // {
    //   id: '2',
    //   pid: '0',
    //   icon: 'mdi-earth',
    //   name: '室外场景',
    //   url: '/gis',
    //   tag: true,
    //   children: [],
    // },
  ],
  login: true,
  dialog: false,
  token: localStorage.getItem('token'),
})

const router = useRouter()
const route = useRoute()

const user = userInfo()

onMounted(() => {
  if (localStorage.getItem('token')) {
    user.changeStatus()
  }
})

function onDialogShow() {
  store.dialog = !store.dialog
}

function close() {
  store.dialog = !store.dialog
}

function onTorouter(obj) {
  if (obj.tag) {
    const href = router.resolve(obj.url)
    window.open(href.href, '_blank')
  } else {
    router.push(obj.url)
  }
}
</script>

<style scoped>
.logo {
  cursor: pointer;
  font-weight: 800;
}
</style>
