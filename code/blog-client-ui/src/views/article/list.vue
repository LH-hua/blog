<template>
  <div class="container">
    <div class="top-nav">
      <div style="width: 500px">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-text-field
              v-bind="props"
              density="compact"
              variant="solo"
              placeholder="输入搜索内容"
              append-inner-icon="mdi-search-web"
              clearable
              v-model="data.serachValue"
              @click:clear="handlerClear"
              @keyup.enter="handlerEnter"
            ></v-text-field>
          </template>
          <v-card v-if="data.serachItems.length">
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
              <v-chip-group selected-class="text-primary">
                <v-chip v-for="item in data.serachItems" :key="item" @click="handlerChip(item)">{{ item }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
      <svg width="100%" height="200" class="wave" viewBox="0 0 1000 200" preserveAspectRatio="none">
        <path d="M0 130 Q250 180 500 130 T1000 130 V200 H0 Z" fill="rgba(255, 255, 255, 0.5)">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M0 130 Q250 80 500 130 T1000 130 V200 H0 Z;
              M0 130 Q250 180 500 130 T1000 130 V200 H0 Z"
          />
        </path>
        <path d="M0 150 Q250 200 500 150 T1000 150 V200 H0 Z" fill="rgba(255, 255, 255, 0.5)">
          <animate
            attributeName="d"
            dur="7s"
            repeatCount="indefinite"
            values="M0 150 Q250 100 500 150 T1000 150 V200 H0 Z;
              M0 150 Q250 200 500 150 T1000 150 V200 H0 Z"
          />
        </path>
        <path d="M0 170 Q250 220 500 170 T1000 170 V200 H0 Z" fill="rgba(255, 255, 255, 0.5)">
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="M0 170 Q250 120 500 170 T1000 170 V200 H0 Z;
              M0 170 Q250 220 500 170 T1000 170 V200 H0 Z"
          />
        </path>
        <path d="M0 190 Q250 240 500 190 T1000 190 V200 H0 Z" fill="rgba(255, 255, 255, 0.5)">
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="M0 190 Q250 140 500 190 T1000 190 V200 H0 Z;
              M0 190 Q250 240 500 190 T1000 190 V200 H0 Z"
          />
        </path>
      </svg>
    </div>
    <div class="main">
      <side-main>
        <template #right>
          <div style="align-self: flex-start; position: sticky; top: 65px">
            <v-sheet rounded="lg" class="pa-2" :elevation="1">
              <card-image></card-image>
            </v-sheet>
            <br />
            <v-sheet rounded="lg" class="pa-2" :elevation="1">
              <v-card flat>
                <v-card-title>标签</v-card-title>
                <v-card-text>
                  <v-chip
                    class="ma-2"
                    color="cyan"
                    label
                    size="small"
                    v-for="item in data.captcha"
                    :key="item.captcha"
                    @click="handlerCaptch(item.captcha)"
                  >
                    <v-icon icon="mdi-label" start></v-icon>{{ item.captcha }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-sheet>
            <br />
            <v-sheet rounded="lg" class="pa-2" :elevation="1">
              <v-card flat>
                <v-card-title><v-icon icon="mdi-bullhorn"></v-icon>公告</v-card-title>
                <v-card-text>
                  {{ data.announcement }}
                </v-card-text>
              </v-card>
            </v-sheet>
          </div>
        </template>

        <template #main>
          <v-sheet class="pa-1 bg" min-height="70vh" rounded="lg" :elevation="1">
            <v-card
              v-for="item in data.data"
              :key="item._id"
              @click="onDetal(item)"
              class="ma-2 d-flex flex-no-wrap align-center justify-space-between"
              flat
              hover
            >
              <v-card flat>
                <v-card-item>
                  <v-card-title class="text-h6 font-weight-medium">
                    <h2>
                      {{ item.title }}
                    </h2>
                  </v-card-title>
                  <v-card-subtitle>
                    {{ formartTime(item.date) }}
                  </v-card-subtitle>
                  <v-card-text>
                    <div style="height: 100px; overflow: hidden">
                      {{ item.body }}
                    </div>
                  </v-card-text>
                </v-card-item>
                <v-card-actions>
                  <v-chip v-for="items in item.captchas" :key="items" color="primary">{{ items.captcha }}</v-chip>
                </v-card-actions>
              </v-card>
              <v-img v-if="item.cover" style="border-radius: 4px" :width="300" :height="200" class="ma-2" aspect-ratio="4/3" cover :src="item.cover">
                <template v-slot:error>
                  <v-img style="border-radius: 4px" :width="300" :height="200" class="ma-2" aspect-ratio="4/3" cover src="/image/err.jpg"></v-img>
                </template>
              </v-img>
            </v-card>
          </v-sheet>
        </template>
      </side-main>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import markdown from 'markdown-it'
import moment from 'moment'

import { getArticleList, getCaptcha } from '@/http/article'
import { announcement } from '@/http/sys'

import cardImage from '@/components/cardImage.vue'

const router = useRouter()
const data = reactive({
  data: [],
  captcha: [],
  serachItems: [],
  serachValue: '',
  announcement: '',
})
const md = new markdown()

function formartTime(val) {
  return moment(val).format('YYYY-MM-DD HH:mm')
}

function handlerCaptch(item) {
  getArticleList({ captcha: item }).then((res) => {
    mdTotext(res.data)
    data.data = res.data
  })
}

function handlerChip(item) {
  data.serachValue = item
  handlerEnter()
}
function handlerEnter() {
  // 键盘enter事件
  if (data.serachValue) {
    getArticleList({ title: data.serachValue }).then((res) => {
      mdTotext(res.data)
      data.data = res.data
    })
    const histroy = getStroage()
    if (histroy instanceof Array) {
      const T = histroy.includes(data.serachValue)
      if (T) return
      histroy.push(data.serachValue)
      setStroage(histroy)
    }
  }
}
// function handlerClear(){

// }
function clearHandler() {
  // 清除历史搜索内容
  localStorage.removeItem('serach')
  data.serachItems = []
}
function onDetal(obj) {
  router.push('detal/' + obj._id)
}

function mdTotext(data) {
  data.forEach((item) => {
    const div = document.createElement('div')
    const mdToHtml = md.render(item.body)
    div.innerHTML = mdToHtml
    const text = div.textContent || div.innerText
    item.body = text.trim()
  })
}

function setStroage(data) {
  const value = JSON.stringify(data)
  localStorage.setItem('serach', value)
}
function getStroage() {
  let storageHistory = []
  if (localStorage.getItem('serach') !== null) {
    storageHistory = JSON.parse(localStorage.getItem('serach'))
  }
  return storageHistory
}

onBeforeMount(() => {
  getArticleList().then((res) => {
    mdTotext(res.data)
    data.data = res.data
  })
  getCaptcha().then((res) => {
    data.captcha = res.data
  })
  announcement().then((res) => {
    data.announcement = res.data.announcement
  })
  data.serachItems = getStroage()
})
</script>

<style scoped lang="scss">
.bg {
  backdrop-filter: blur(10px);
}
.top-nav {
  height: 20vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  background: url('/image/nav.jpg');
  background-size: cover;
  /* overflow: hidden; */
  /* 使用 clip-path 属性创建贝塞尔曲线效果 */
  /* clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%); */
  .wave {
    position: absolute;
    bottom: 0;
  }
}
.top-nav::after {
  content: '';
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, #fff, transparent);
}
/* 定义导航栏下边框样式 */
</style>
