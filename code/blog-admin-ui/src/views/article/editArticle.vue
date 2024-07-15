<template>
  <div>
    <v-card flat>
      <v-card-item>
        <v-card-title>
          <v-responsive max-width="500">
            <div class="d-flex">
              <v-text-field v-model="data.title" hide-details variant="outlined" density="compact"></v-text-field>
              <v-dialog max-width="500" v-model="dialog">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" color="blue" text="发 布" variant="flat" style="margin-left: 10px" @click="publish"></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2">标题：</v-col>
                          <v-col cols="10">
                            <v-text-field v-model="data.title" hide-details variant="outlined" density="compact"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2">描述：</v-col>
                          <v-col cols="10">
                            <v-textarea v-model="data.descr" placeholder="总结一下这篇文章。。。" variant="outlined"></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2">封面：</v-col>
                          <v-col cols="10">
                            <upload :initialImageUrl="data.cover" @uploadImage="handlerUploadImage" @clearImage="clearImage"></upload>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text="取 消" @click="isActive.value = false"></v-btn>
                      <v-btn text="确 定" @click="submit"></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-btn color="blue" text="返 回" variant="flat" @click="handlerReturn" style="margin-left: 10px"></v-btn>
            </div>
          </v-responsive>
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <div id="editor"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import upload from '@/components/uploadImage.vue'

import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import Markdowm from 'markdown-it'

import { addArticle, getPostDetal } from '@/http/article'

const route = useRoute()
const mark = new Markdowm()
let editor
const data = ref({
  title: '',
  cover: '',
  descr: '',
  body: '',
})

const dialog = ref(false)
const handlerReturn = () => {
  window.history.back()
}

const mdToText = (md) => {
  const dom = document.createElement('div')
  const renderHtml = mark.render(md)
  dom.innerHTML = renderHtml
  const text = dom.textContent || dom.innerText
  return text.trim().slice(0, 200) + '...'
}
const handlerUploadImage = (file) => {}

const clearImage = (file) => {}

const publish = () => {
  const md = editor.getMarkdown()
  data.value.descr = mdToText(md)
  // data.value.descr =
  // console.log(editor.getHTML())
  // console.log(mdToText(md))
  dialog.value = true
}
const submit = () => {
  data.value.body = editor.getMarkdown()
  addArticle(data.value).then((res) => {
    dialog.value = false
  })
}
const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '83vh',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    language: 'zh-CN',
  })
  editor.setMarkdown(data.value.body)
}

onMounted(() => {
  const p = toRaw(route)
  getPostDetal({
    _id: p.query.id,
  }).then((res) => {
    data.value = res.data.data
    initEditor()
  })
})
</script>

<style scoped>
/* @import '@toast-ui/editor/dist/toastui-editor.css'; */
</style>
