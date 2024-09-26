<template>
  <div>
    <v-toolbar density="compact">
      <v-btn class="text-none text-subtitle-1" variant="flat" color="#5865f2" @click="sumbit">发 布</v-btn>
    </v-toolbar>
    <br />
    <div id="editor"></div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import Editor from '@toast-ui/editor'
import codeSyntaxHighlight  from '@toast-ui/editor-plugin-code-syntax-highlight';

import Prism from 'prismjs'
import 'prismjs/themes/prism-dark.min.css'
import 'prismjs/components/prism-csharp.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-javascript.min.js'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import axios from '@/http/axios'

let editor
const store = ref()

const sumbit = () => {
  const text = editor.getMarkdown()
  if (!text) {
    return
  }
  const data = {
    id: store.value._id,
    text,
  }
  axios.post('/api/sys/about/update', data).then((res) => {
    console.log(res)
    aboutQuery()
  })
}
const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '80vh',
    placeholder: '关于网站说明。。。',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    hooks: {
      addImageBlobHook: (blob, callback) => {
        const formData = new FormData()
        formData.append('image', blob)
        axios.post('/api/file/upload-image', formData).then((res) => {
          callback(res.data.src, '')
        })
      },
    },
  })
}

const aboutQuery = () => {
  axios.get('/api/sys/about').then((res) => {
    store.value = res.data.data
    editor.setMarkdown(res.data.data.text)
  })
}
onBeforeMount(() => {})
onMounted(() => {
  initEditor()
  aboutQuery()
})
</script>
