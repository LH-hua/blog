<template>
  <div class="containner">
    <side-main>
      <template #main>
        <v-sheet rounded="lg" class="pa-5">
          <div style="display: flex; align-items: center">
            话题：
            <v-chip-group>
              <v-chip class="ma-2" variant="text" label v-for="tab in data.captcha" :key="tab" @click="handlerCategorie(tab)">
                {{ tab.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
        <v-sheet style="margin-top: 10px" rounded="lg" class="pa-5">
          <router-view></router-view>
        </v-sheet>
      </template>
      <template #side>
        <publish></publish>
        <v-sheet style="margin-top: 10px" class="pa-5" rounded="lg" color="white">
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
</template>

<script setup>
import { reactive, ref, onBeforeMount, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { getArticleList, getCaptcha, getNewPost } from '@/http/article'

import publish from '@/components/publish.vue'

const router = useRouter()
const newPost = ref()

const data = reactive({
  data: [],
  captcha: [],
  // announcement: '',
})

const handlerCategorie = (item) => {
  router.push(`/categories/${item._id}`)
}
onBeforeMount(() => {
  getCaptcha().then((res) => {
    data.captcha = res.data
  })
  getNewPost().then((res) => {
    newPost.value = res.data
  })
  // announcement().then((res) => {
  //   data.announcement = res.data.announcement
  // })
})
</script>

<style lang="scss" scoped>
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
}
</style>
