<template>
  <div>
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
              flat
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
    </div>
    <div class="main">
      <side-main>
        <template #right>
          <v-sheet rounded="lg">
            <card-image></card-image>
          </v-sheet>
          <br />
          <v-sheet rounded="lg">
            <v-card flat>
              <v-card-title>标签</v-card-title>
              <v-card-text>
                <v-chip class="ma-2" color="cyan" label size="small" v-for="item in data.captcha" :key="item.captcha">
                  <v-icon icon="mdi-label" start></v-icon>{{ item.captcha }}
                </v-chip>
              </v-card-text>
            </v-card>
          </v-sheet>
          <br />
          <v-sheet rounded="lg">
            <v-card flat>
              <v-card-title><v-icon icon="mdi-bullhorn"></v-icon>公告</v-card-title>
              <v-card-text>
                <p>这是LH个人博客，记录和分享日常</p>
                <p>有问题欢迎讨论交流</p>
              </v-card-text>
            </v-card>
          </v-sheet>
        </template>

        <template #main>
          <v-sheet class="pa-5" min-height="70vh" rounded="lg">
            <div class="d-flex flex-no-wrap justify-space-between" v-for="item in data.data" :key="item._id" @click="onDetal(item)">
              <v-card flat hover>
                <v-card-item>
                  <v-card-item-title class="text-h6 font-weight-medium">
                    {{ item.title }}
                  </v-card-item-title>
                  <v-card-item-text>
                    <div style="height: 70px; overflow: hidden">
                      {{ item.body }}
                    </div>
                  </v-card-item-text>
                </v-card-item>
                <v-card-actions>
                  <v-chip variant="text"> <v-icon icon="mdi-clock-time-eight-outline"></v-icon>{{ item.date }} </v-chip>
                </v-card-actions>
              </v-card>
              <div>
                <v-img :width="263" aspect-ratio="4/3" rounded cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
              </div>
            </div>
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

import { getArticleList, getCaptcha } from '@/http/article'

import cardImage from '@/components/cardImage.vue'

const router = useRouter()
const data = reactive({
  data: [],
  captcha: [],
  serachItems: [],
  serachValue: '',
})
const md = new markdown()

function handlerChip(item) {
  data.serachValue = item
  handlerEnter()
}
function handlerEnter() {
  // 键盘enter事件
  console.log('enter')
  if (data.serachValue) {

    getArticleList({title:data.serachValue}).then((res) => {
      mdTotext(res.data)
      data.data = res.data
    })
    const histroy = getStroage()
    if (histroy instanceof Array) {
      const T = histroy.includes(data.serachValue)
      if(T) return
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
  data.serachItems = getStroage()
})
</script>

<style scoped>
.top-nav {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  align-items: center;
  min-height: 10vh;
  background-color: rgb(118, 218, 255);
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    min-width: 100vw;
    min-height: 10vw;
    /* background-color: #fff; */
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:before {
    bottom: 5vh;
    border-radius: 45%;
    animation-duration: 10s;
  }

  &:after {
    bottom: 5vh;
    opacity: 0.5;
    border-radius: 47%;
    animation-duration: 10s;
  }
}
@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, -2%) rotateZ(20deg);
  }
  100% {
    transform: translate(-50%, 0%) rotateZ(45deg);
  }
}
</style>
