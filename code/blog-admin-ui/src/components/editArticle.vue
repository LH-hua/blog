<template>
  <div>
    <div class="top-content">
      <div>
        <v-form v-model="valid">
          <v-container>
            <v-row dense>
              <v-col cols="2">
                <v-list-subheader>标题：</v-list-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="content.title" variant="outlined" required density="compact"></v-text-field>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">
                <v-list-subheader>封面：</v-list-subheader>
              </v-col>
              <v-col cols="8">
                <v-file-input
                  variant="outlined"
                  prepend-icon=""
                  placeholder="上传封面图片"
                  accept="image/png, image/jpeg, image/bmp"
                  required
                  density="compact"
                  @change="changeFile"
                ></v-file-input>
              </v-col>
              <v-col cols="2" v-if="imageData.image">
                <v-btn color="secondary" variant="flat" @click="handlerUpLoad">上传</v-btn>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">
                <v-list-subheader>分类：</v-list-subheader>
              </v-col>
              <v-col cols="10">
                <v-select
                  v-model="content.captcha"
                  item-title="captcha"
                  item-value="captcha"
                  :items="imageData.captcha"
                  variant="outlined"
                  multiple
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-btn color="secondary" @click="submit" variant="flat">发布</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
      <div>
        <v-img v-if="imageData.image" :width="300" :height="200" rounded cover :src="imageData.image"></v-img>
      </div>
    </div>

    <div>
      <div id="editor"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps } from 'vue'

import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

import { addArticle, getCaptcha } from '@/http/article'
import {upload} from '@/http/user'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    default: '',
  },
  cover: {
    type: String,
    default: '',
  },
  captcha: {
    // 文章分类
    type: Array,
    default: [],
  },
  id: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['ok'])
const imageData = reactive({
  image: props.cover,
  blob:null,
  captcha: [],
  select: { captcha: null },
})
const content = ref({
  title:props.title,
  body:props.body,
  cover:props.cover,
  captcha:props.captcha,
  id:props.id,
})
let editor = reactive(null)

const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '800px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: content.value.body,
  })
}

const handlerUpLoad = () => {
  const form = new FormData()
  form.append('image',imageData.blob)
  upload(form).then(res => {
    content.value.cover = res.data.src
    console.log(content.value)
  })
}
const changeFile = async (file) => {
  const uploadedFile = file.target.files[0] // 假设只上传一个文件
  imageData.blob = uploadedFile
  imageData.image = await imgbase(uploadedFile)
}
function imgbase(file) {
  // new 一个Promise实例
  return new Promise((resolve) => {
    // 对文件对象的处理
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(this.result)
    }
  })
}

const submit = () => {
  const body = editor.getMarkdown()
  console.log(content)
  const data = {
    title: content.value.title,
    id: content.value.id,
    body: body,
    captcha: content.value.captcha,
    cover:content.value.cover
  }
  console.log(data)
  addArticle(data).then((res) => {
    console.log(res)
    emit('ok','emit')
  })
}

onMounted(() => {
  initEditor()
  getCaptcha().then((res) => {
    imageData.captcha = res.data.data
  })
})
</script>

<style scoped lang="scss">
.top-content {
  display: flex;
  div:nth-child(1) {
    flex: 5;
  }
  div:nth-child(2) {
    flex: 2;
  }
}
</style>
