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
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          class="mx-auto"
          density="compact"
          variant="outlined"
          placeholder="输入搜索内容"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          flat
          rounded
          item-props
          v-model="data.serachValue"
          @click:clear="handlerClear"
          @keyup.enter="handlerEnter"
          @update:focused="focused"
        ></v-text-field>
      </template>
      <v-card v-if="data.historyItems">
        <v-toolbar density="compact" extended :extension-height="10" color="white">
          <v-toolbar-title>
            <div style="color: rgba(0, 0, 0, 0.5)">搜索历史</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn style="color: rgba(0, 0, 0, 0.5)" @click="clearHandler">
            清除
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list-item v-for="item in data.historyItems" :key="item" @click="handlerChip(item)">{{ item }}</v-list-item>
          <!-- <v-chip-group selected-class="text-primary">
            <v-chip v-for="item in data.historyItems" :key="item" @click="handlerChip(item)">{{ item }}</v-chip>
          </v-chip-group> -->
        </v-card-text>
      </v-card>
    </v-menu>
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
import { userSearchFilters } from '@/store/dataStore'

const data = reactive({
  serachValue: '',
  historyItems: [],
})
const store = reactive({
  menu: [
    {
      id: '0',
      pid: '0',
      icon: 'mdi-home-outline',
      name: '首 页',
      url: '/',
      tag: false,
      children: [],
    },
    // {
    //   id: '1',
    //   pid: '0',
    //   icon: 'mdi-compass-rose',
    //   name: '案列展示',
    //   url: '/project',
    //   tag: false,
    //   children: [],
    // },
    {
      id: '1',
      pid: '0',
      icon: 'mdi-earth',
      name: 'webGIS',
      url: 'http://8.134.217.110:4060',
      thirdParty: true,
      tag: false,
      children: [],
    },
    {
      id: '1',
      pid: '0',
      icon: 'mdi-account',
      name: '关于',
      url: '/about',
      tag: false,
      children: [],
    },
  ],
  login: true,
  dialog: false,
  token: localStorage.getItem('token'),
})

const router = useRouter()
const route = useRoute()

const user = userInfo()
const serachFilters = userSearchFilters()

const focused = (boolean) => {
  if (boolean) {
    const history = serachFilters.history()
    data.historyItems = history
  }
}

const clearHandler = () => {
  serachFilters.clear()
}
function handlerChip(item) {
  data.serachValue = item
  handlerEnter()
}
async function handlerEnter() {
  // 键盘enter事件
  if (data.serachValue) {
    const serach = await serachFilters.query({ title: data.serachValue })
    data.serachValue = ''
    // router.push('search')
  }
}

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
  if (obj.thirdParty) {
    window.open(obj.url, '_blank')
    return false
  }
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
