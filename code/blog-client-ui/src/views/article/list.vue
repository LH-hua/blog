<template>
  <div class="container">
    <!-- <div class="top-nav">
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
    </div> -->
    <div class="main">
      <side-main>
        <template #main>
          <v-card flat border>
            <v-card-text>
              <div style="width: 100%; display: flex; justify-content: center; align-items: center">
                <div style="flex: 1">
                  分类标签：
                  <v-chip-group>
                    <v-chip class="ma-2" label v-for="tab in data.captcha" :key="tab" @click="handlerChip(tab)"> {{ tab.name }} </v-chip>
                  </v-chip-group>
                </div>
                <div style="flex: 1">
                  <search></search>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <v-sheet class="pa-5" style="margin-top: 10px" min-height="85vh" rounded="lg" border color="white" flat>
            <div v-for="item in data.data" :key="item._id" class="ma-2 d-flex flex-no-wrap align-center justify-space-between" flat>
              <div style="flex: 6">
                <v-card flat>
                  <v-card-title class="text-black" @click="onDetal(item)">
                    <div class="cursor-pointer" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer">
                      {{ item.title }}
                    </div>
                  </v-card-title>
                  <v-card-subtitle>
                    <div style="display: flex; gap: 10px; align-items: center">
                      <v-avatar size="30">
                        <v-img :src="item.auther.avatar" :alt="item.auther.username"></v-img>
                      </v-avatar>
                      <span>{{ item.auther.username }}</span>
                      <span style="color: rgba(0, 0, 0, 0.5); font-size: 12px">
                        {{ formartTime(item.date) }}
                      </span>
                    </div>
                  </v-card-subtitle>
                  <v-card-text>
                    <div class="content-container">
                      {{ item.descr }}
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <!-- <v-btn color="medium-emphasis" prepend-icon="mdi-clock-time-nine-outline" size="small"> </v-btn> -->
                    <v-chip variant="text" color="#8a919f" size="small" v-for="tab in item.captchas_info" :key="tab"> {{ tab.name }} </v-chip>
                  </v-card-actions>
                </v-card>
              </div>
              <div style="flex: 2" v-if="item.cover">
                <v-img style="border-radius: 4px; height: 100%" cover :src="item.cover">
                  <template v-slot:error>
                    <v-img style="border-radius: 4px" width="300" height="200" class="ma-2" cover src="/image/err.jpg"> </v-img>
                  </template>
                </v-img>
              </div>
            </div>
          </v-sheet>
        </template>
        <template #side>
          <v-sheet border rounded="lg" class="pa-5">
            <v-btn color="#f5f5f5" variant="flat" block> 添 加 话 题 </v-btn>
            <br />
            <v-btn color="#f5f5f5" variant="flat" block> 发 布 文 章 </v-btn>
          </v-sheet>
          <v-sheet style="margin-top: 10px" class="pa-5" rounded="lg" color="white" border>
            <v-list-subheader> 最新文章 </v-list-subheader>
            <v-divider></v-divider>
            <v-list-item v-for="(item, index) in newPost" :key="item" @click="onDetal(item)" class="cursor-pointer">
              <v-list-item-title>
                <a>{{ index + 1 }}. {{ item.title }}</a>
              </v-list-item-title>
            </v-list-item>
          </v-sheet>
        </template>
      </side-main>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

import { getArticleList, getCaptcha, getNewPost } from '@/http/article'
// import { announcement } from '@/http/sys'

import { userSearchFilters } from '@/store/dataStore'

import search from '@/components/input/search.vue'
// import cardImage from '@/components/cardImage.vue'
// import tag from '@/components/tag.vue'
// import other from '@/components/other.vue'
// import { Scroll } from '@/utils/tool'
const tab = ref('one')
const router = useRouter()
const { state } = userSearchFilters()

// let tab = ref(null)
const newPost = ref()
const data = reactive({
  data: [],
  captcha: [],
  // announcement: '',
})

function handlerChip(val) {
  query({ captcha_id: val._id })
}
function formartTime(val) {
  return moment(val).format('YYYY-MM-DD HH:mm')
}

function onDetal(obj) {
  router.push('post/' + obj._id)
}

function query(params) {
  getArticleList(params).then((res) => {
    data.data = res.data
  })
}
watch(
  () => state.num,
  (newVal, oldVal) => {
    data.data = state.data
  }
)
onBeforeMount(() => {
  query()
  getNewPost().then((res) => {
    newPost.value = res.data
  })
  getCaptcha().then((res) => {
    data.captcha = res.data
  })
  // announcement().then((res) => {
  //   data.announcement = res.data.announcement
  // })
})
onUnmounted(() => {
  // new Scroll().remove()
})
</script>

<style scoped lang="scss">
.container {
  background: rgb(245, 245, 245);
  background-image: url('/public/image/circuit.png');
  background-repeat: repeat-x;
}
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
  background-image: linear-gradient(to top, #5e95b7, white);

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
.content-container {
  position: relative; /* 使伪元素相对于自身定位 */
  max-height: 200px; /* 最大高度 */
  overflow: hidden; /* 隐藏超出部分 */
  color: #8a919f;
}

// .content-container::after {
//   content: '…'; /* 省略号 */
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   background: white; /* 背景颜色 */
//   padding: 0 5px; /* 内边距 */
// }
</style>
