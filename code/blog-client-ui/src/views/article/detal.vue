<template>
  <div class="container">
    <side-main>
      <template #right>
        <div style="align-self: flex-start; position: sticky; top: 65px">
          <v-sheet rounded="lg" class="pa-2" :elevation="1">
            <card-image></card-image>
          </v-sheet>
          <br />
          <v-sheet rounded="lg" class="pa-2" :elevation="1">
            <v-card flat>
              <v-card-title>目录</v-card-title>
              <v-card-text>
                <div class="table-of-contents"></div>
              </v-card-text>
            </v-card>
          </v-sheet>
        </div>
      </template>

      <template #main>
        <v-sheet class="pa-2" rounded="lg" :elevation="3">
          <v-card flat min-height="900px">
            <v-card-title>
              <h2 style="font-weight: 1000;">
                {{ store.data.title }}
              </h2>
            </v-card-title>
            <v-card-subtitle>
              {{ store.data.date }}
            </v-card-subtitle>
            <v-card-text>
              <div class="typo">
                <div v-html="store.data.body"></div>
              </div>
            </v-card-text>
          </v-card>
        </v-sheet>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
import hljs from 'highlight.js'
// import "highlight.js/styles/github.css";
import '@/assets/css/typo.css'

import { getArticleDetal } from '@/http/article'

import cardImage from '@/components/cardImage.vue'

const store = reactive({
  data: {
    title: '',
    date: '',
    body: '',
  },
  user: {},
  puc: {
    name: '产品名称',
    desc: '产品描述',
    price: '产品价格',
    imgUrl: [],
  },
})

const md = ref(null)

const route = useRoute()

function initMd() {
  const left = document.querySelector('.table-of-contents')
  md.value = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.value.utils.escapeHtml(str) + '</code></pre>'
    },
  })
    .use(anchor, { permalink: true, permalinkBefore: true })
    .use(toc, {
      callback: function (html, ast) {
        //把目录单独列出来
        left.innerHTML = html
        allADemo()
      },
    })
}

function allADemo() {
  const allA = document.querySelectorAll('.table-of-contents a')
  allA.forEach((item) => {
    item.style.color = 'rgba(0,0,0,0.5)'
    item.style.fontWeight = 800
    console.log(item)
    item.addEventListener('click', function (e) {
      e.preventDefault()

      item.scrollIntoView(true)
    })
  })
}

function getData() {
  const postId = route.params.id
  getArticleDetal({ _id: postId }).then((res) => {
    res.data.body = md.value.render(res.data.body)
    store.data = res.data
  })
}

onMounted(() => {
  initMd()
  getData()
  const dom = document.querySelector('.custom')
  dom.style.position = 'none'
  dom.style.color = 'black'
})
</script>

<style leng="less" scoped>
/* @import '../../assets/css/typo.css'; */
.container {
  margin-top: 60px;
}
</style>
