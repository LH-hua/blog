<template>
  <div class="containner">
    <side-main>
      <template #main>
        <v-sheet class="pa-5">
          <div style="display: flex; align-items: center">
            <div style="width: 70px">话题：</div>
            <v-chip-group column>
              <v-chip class="ma-2" variant="text" label @click="handlerCategorie"> 全部 </v-chip>
              <v-chip class="ma-2" variant="text" label v-for="tab in categories" :key="tab" @click="handlerCategorie(tab)">
                {{ tab.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
        <v-sheet style="margin-top: 10px" class="pa-5">
          <router-view></router-view>
        </v-sheet>
      </template>
      <template #side>
        <publish></publish>
        <sys></sys>
        <v-sheet style="margin-top: 10px" class="pa-5" color="white">
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
import { ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'

import { getNewPost } from '@/http/article'
import { userDataList } from '../../store'

import publish from '@/components/publish.vue'
import sys from '@/components/sys.vue'

const router = useRouter()
const newPost = ref()
const { captchaList, queryPost } = userDataList()

const categories = computed(() => captchaList)
const handlerCategorie = (item) => {
  if (!item._id) {
    router.push({
      path: '/',
    })
    queryPost()

    return
  }
  queryPost({ captcha_id: item._id })
  router.push(`/categories/${item._id}`)
}
onBeforeMount(() => {
  getNewPost().then((res) => {
    newPost.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
}
</style>
