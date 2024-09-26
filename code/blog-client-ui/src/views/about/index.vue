<template>
  <div class="container">
    <side-main>
      <template #main>
        <v-sheet style="min-height: 70vh" class="pa-5">
          <div id="viewer"></div>
        </v-sheet>
      </template>
      <template #side>
        <publish></publish>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Editor from '@toast-ui/editor'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'

import Prism from 'prismjs'
import 'prismjs/themes/prism-dark.min.css'
import 'prismjs/components/prism-csharp.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-javascript.min.js'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'

import { request } from '@/http/request'
import publish from '@/components/publish.vue'

const router = useRouter()
const store = ref()

const initMarkdown = () => {
  Editor.factory({
    el: document.querySelector('#viewer'),
    viewer: true,
    initialValue: store.value.text,
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
  })
}
const aboutQuery = () => {
  request.get('/api/sys/about').then((res) => {
    store.value = res.data.data
    initMarkdown()
  })
}
onMounted(() => {
  aboutQuery()
})
</script>

<style leng="less" scoped>
.container {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
}
</style>
