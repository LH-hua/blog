<template>
  <side-main>
    <template #right>
      <v-sheet rounded="lg">
        <card-image></card-image>
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
              <div class="text-subtitle-1">
                {{ item.date }}
              </div>
            </v-card-actions>
          </v-card>
          <v-avatar class="ma-3" rounded="0" size="150">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
          </v-avatar>
        </div>
        <!-- <v-list lines="three">
          <v-list-img>
            <v-img :width="300" aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
          </v-list-img>
          <v-list-item v-for="item in data.data" :key="item._id" prepend-avatar="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-action>{{ item.date }}</v-list-item-action>
          </v-list-item>
        </v-list> -->
      </v-sheet>
    </template>
  </side-main>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import markdown from 'markdown-it'

import { getArticleList } from '@/http/article'

import cardImage from '@/components/cardImage.vue'

const router = useRouter()
const data = reactive({
  data: [],
})
const md = new markdown()

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
onBeforeMount(() => {
  getArticleList().then((res) => {
    mdTotext(res.data)
    data.data = res.data
  })
})
</script>

<style scoped></style>
