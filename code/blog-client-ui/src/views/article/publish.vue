<template>
  <div>
    <v-app-bar density="compact" style="position: static">
      <v-container class="d-flex align-center">
        <v-app-bar-title class="text-h5">文章发布</v-app-bar-title>
        <v-btn @click="handerPublishSet" color="blue">发布</v-btn>
      </v-container>
    </v-app-bar>
    <div class="main">
      <v-container class="d-flex align-center">
        <v-card style="width: 100%; height: 100%" flat>
          <v-card-title>
            <v-text-field v-model="data.title" density="compact" variant="outlined" placeholder="输入标题"></v-text-field>
          </v-card-title>
          <v-card-text>
            <div id="editor"></div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
    <v-dialog max-width="700" v-model="isActive">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title> 发布到: {{ target }} </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="2">模块选择：</v-col>
              <v-col cols="10">
                <v-radio-group v-model="radio" inline hide-details>
                  <v-radio label="技术区" value="post"></v-radio>
                  <v-radio label="往昔册" value="pastBooks"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">封面：</v-col>
              <v-col cols="10">
                <v-file-input
                  v-model="files"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon=""
                  hide-details
                  prepend-inner-icon="mdi-file-image"
                  placeholder="选择一张图片做封面吧"
                  variant="outlined"
                  density="compact"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row v-if="radio == 'post'">
              <v-col cols="2">分类：</v-col>
              <v-col cols="10">
                <v-select
                  label="分类"
                  v-model="data.captcha_id"
                  :items="captchas"
                  item-title="name"
                  item-value="_id"
                  variant="outlined"
                  density="compact"
                  multiple
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">描述：</v-col>
              <v-col cols="10">
                <v-textarea v-model="data.descr" placeholder="用简短的几句话总结一下这篇文章吧" hide-details variant="outlined"></v-textarea>
              </v-col>
            </v-row>
            <v-img :width="300" aspect-ratio="16/9" cover :src="files"></v-img>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="取 消" color="#F5F5F5" class="text-none mb-4" variant="flat" @click="isActive.value = false"></v-btn>
            <v-btn text="确 定" color="indigo-darken-3" class="text-none mb-4" variant="flat" @click="submit"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

import { addArticle, getCaptcha } from '@/http/article'
import { formdata, post } from '@/http/request'

let editor
const radio = ref('post')
const captchas = ref()
const isActive = ref(false)

const files = ref()
const data = reactive({
  title: '',
  cover: '',
  descr: '',
  body: '',
})

const target = computed(() => {
  return radio.value == 'post' ? '技术区' : '往昔册'
})
const changeFile = (file) => {
  console.log(file)
}
const handerPublishSet = () => {
  isActive.value = true
}

const submit = async () => {
  if (files.value) {
    const formData = new FormData()
    formData.append('image', files.value)
    const res = await formdata('/api/file/upload-image', formData)
    data.cover = res.data.src
  }
  const markdownText = editor.getMarkdown()
  data.body = markdownText
  if (radio.value == 'pastBooks') {
    data.descr = data.text
    const res = await post('/api/pastBooks/create', data)
    if (res.status == 200) {
      isActive.value = false
    }
  } else {
    addArticle(data).then(() => {
      isActive.value = false
    })
  }
}
const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '83vh',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    hooks: {
      addImageBlobHook: (blob, callback) => {
        const formData = new FormData()
        formData.append('image', blob)
        formdata('/api/file/upload-image', formData).then((res) => {
          callback(res.data.src, '')
        })
      },
    },
  })
}

onMounted(() => {
  initEditor()
  getCaptcha().then((res) => {
    captchas.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.main {
  background: rgb(245, 245, 245);
  background-image: url('/public/image/circuit.png');
  background-repeat: repeat-x;
  min-height: 96vh;
}
</style>
