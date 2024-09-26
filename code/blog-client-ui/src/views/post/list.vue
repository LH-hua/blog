<template>
  <div>
    <v-list>
      <v-list-item v-for="item in data.data" :key="item">
        <v-list-item-title
          ><a :href="'/posts/' + item._id" Target="_blank">
            {{ item.title }}
          </a></v-list-item-title
        >
        <v-list-item-subtitle>
          <v-chip density="compact" color="primary" size="small"> {{ item.captchas_info.name }} </v-chip> · 
          <span>{{ item.auther.username }}</span> · <span>{{ dateFormat(item.date) }}</span> ·
          <span>{{ item.readcount || 0 }} 阅读量</span></v-list-item-subtitle
        >
        <br />
        <v-divider></v-divider>
        <template v-slot:prepend>
          <v-avatar size="50">
            <v-img :src="item.auther.avatar"></v-img>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onUnmounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'

import { getArticleList, getCaptcha, getNewPost } from '@/http/article'

const router = useRouter()
const route = useRoute()
const data = reactive({
  data: [],
  captcha: [],
})

const dateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}
function query(params) {
  getArticleList(params).then((res) => {
    data.data = res.data
  })
}
watch(
  () => route.name,
  () => {
    query({ captcha_id: route.params.id })
  },
  { immediate: true, deep: true }
)
onBeforeMount(() => {
  query({ captcha_id: route.params.id })
  getCaptcha().then((res) => {
    data.captcha = res.data
  })
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
