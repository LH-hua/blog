<template>
  <div>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-form v-model="valid">
        <v-container>
          <v-row dense>
            <v-col cols="1">
              <v-list-subheader>标题：</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="content.title" variant="outlined" required density="compact"></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="1">
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
                @change="handleFileUpload"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-btn color="secondary" @click="submit" variant="flat">发布</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <div>
        <v-img v-if="imageData.image" :width="300" :src="imageData.image"></v-img>
      </div>
    </div>

    <div>
      <div id="editor"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'

import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

import { addArticle } from '@/http/article'

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
})

const imageData = reactive({
  image: '',
})
const content = ref(props)
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

const handleFileUpload = async (file) => {
  const uploadedFile = file.target.files[0] // 假设只上传一个文件
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
  console.log(content.cover)
  const data = {
    title: content.title,
    body: body,
  }
  // addArticle(data).then((res) => {
  //   console.log(res)
  // })
}

onMounted(() => {
  initEditor()
})
</script>
