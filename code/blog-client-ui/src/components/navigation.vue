<template>
  <v-container class="d-flex align-center">
    <div
      class="font-weight-bold"
      style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; text-align: center; cursor: pointer"
      @click="handlerToHome"
    >
      昔日
    </div>
    <v-spacer></v-spacer>
    <ul class="navigation">
      <li v-for="item in store.menu" :key="item.url">
        <a :href="item.url">{{ item.name }}</a>
      </li>
    </ul>
    <login></login>
  </v-container>
</template>

<script setup>
import { reactive, defineEmits, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// components
import login from '@/components/user/login.vue'
import userMenu from './user/userMenu.vue'
// import regsiter from "@/components/user/regsite.vue";

// pinia
import { userInfo } from '../store/userStore'
import { userSearchFilters } from '@/store/dataStore'

const data = reactive({
  serachValue: '',
  historyItems: [],
})
const store = reactive({
  menu: [
    // {
    //   id: '0',
    //   pid: '0',
    //   icon: 'mdi-home-outline',
    //   name: '首 页',
    //   url: '/',
    //   tag: false,
    //   children: [],
    // },
    {
      id: '1',
      pid: '0',
      icon: 'mdi-card-text',
      name: '技术',
      url: '/',
      thirdParty: false,
      tag: false,
      children: [],
    },
    // {
    //   id: '1',
    //   pid: '0',
    //   icon: 'mdi-menu',
    //   name: '展示区',
    //   url: 'show',
    //   thirdParty: false,
    //   tag: false,
    //   children: [],
    // },
    {
      id: '1',
      pid: '0',
      icon: '',
      name: '往昔册',
      url: 'pastBooks',
      thirdParty: false,
      tag: false,
      children: [],
    },

    {
      id: '1',
      pid: '0',
      icon: '',
      name: '易事屋',
      url: '/easyHouse',
      tag: false,
      children: [],
    },
    {
      id: '1',
      pid: '0',
      icon: '',
      name: '需求墙',
      url: '/demand',
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

function handlerToHome() {
  router.push('/')
}
async function handlerEnter() {
  // 键盘enter事件
  if (data.serachValue) {
    const serach = await serachFilters.query({ title: data.serachValue })
    data.serachValue = ''
    // router.push('search')
  }
}

onMounted(() => {})

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

.navigation {
  list-style: none;
  margin: 0;

  /* background: deepskyblue; */

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: flex-end;
}

.navigation a {
  text-decoration: none;
  display: block;
  padding: 1em;
  color: black;
}

.navigation a:hover {
  color: deepskyblue;
}

@media all and (max-width: 800px) {
  .navigation {
    justify-content: space-around;
  }
}

@media all and (max-width: 600px) {
  .navigation {
    -webkit-flex-flow: column wrap;
    flex-flow: column wrap;
    padding: 0;
  }

  .navigation a {
    text-align: center;
    padding: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .navigation li:last-of-type a {
    border-bottom: none;
  }
}
</style>
