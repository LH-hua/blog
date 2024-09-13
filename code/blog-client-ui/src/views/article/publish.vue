<template>
  <div>
    <v-app-bar density="compact" style="position: static">
      <v-container class="d-flex align-center">
        <v-app-bar-title>文章发布</v-app-bar-title>
        <v-btn>发布</v-btn>
      </v-container>
    </v-app-bar>
    <div class="main">
      <v-container class="d-flex align-center">
        <v-card style="width: 100%; height: 100%" flat>
          <v-card-title>
            <v-text-field density="compact" variant="outlined"></v-text-field>
          </v-card-title>
          <v-card-text>
            <div id="editor"></div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

let editor
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
        axios.post('/api/file/upload-image', formData).then((res) => {
          callback(res.data.src, '')
        })
      },
    },
  })
}

onMounted(() => {
  initEditor()
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
