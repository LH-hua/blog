<template>
  <div>
    <div class="d-flex ga-2 justify-space-around">
      <div>标题：</div>
      <v-text-field v-model="content.title" variant="outlined" required density="compact"></v-text-field>
      <v-btn color="secondary" @click="submit" variant="flat">发布</v-btn>
    </div>
    <v-dialog v-model="dialog" width="600">
      <v-card title="封面信息">
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="2">
                <v-list-subheader>分类：</v-list-subheader>
              </v-col>
              <v-col cols="10">
                <v-select
                  v-model="content.captcha"
                  density="compact"
                  item-title="captcha"
                  item-value="captcha"
                  :items="imageData.captcha"
                  variant="outlined"
                  multiple
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2">
                <v-list-subheader>封面：</v-list-subheader>
              </v-col>
              <v-col cols="10">
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
            </v-row>
            <v-row dense>
              <v-col cols="2"> </v-col>
              <v-col cols="10">
                <v-img v-if="imageData.image" :width="300" :height="200" rounded cover :src="imageData.image"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="确认发布" @click="ok"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <div>
      <div id="editor"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onDeactivated, defineProps } from 'vue'

import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

import { addArticle, getCaptcha } from '@/http/article'
import { upload } from '@/http/user'

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
  captchas: {
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
const dialog = ref(false)

const imageData = reactive({
  image: props.cover,
  blob: null,
  captcha: [],
  select: { captcha: null },
})
const content = ref({
  title: props.title,
  body: props.body,
  cover: props.cover,
  captcha: props.captchas,
  id: props.id,
})

let editor = reactive(null)

const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '1080px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: content.value.body,
  })
}

const handlerUpLoad = () => {
  const form = new FormData()
  form.append('image', imageData.blob)
  upload(form).then((res) => {
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
  dialog.value = true
}

const ok = () => {
  const body = editor.getMarkdown()
  const data = {
    title: content.value.title,
    id: content.value.id,
    body: body,
    captcha: content.value.captcha,
    cover: content.value.cover,
  }
  addArticle(data).then((res) => {
    dialog.value = false
    emit('ok', 'emit')
  })
}

onDeactivated(() => {
  imageData.image = null
})
onMounted(() => {
  initEditor()
  getCaptcha().then((res) => {
    imageData.captcha = res.data.data
  })
})
</script>

<style scoped lang="scss"></style>
