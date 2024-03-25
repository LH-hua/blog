<template>
  <div>
    <div style="width:50%">
      <v-form v-model="valid">
        <v-container>
          <v-row dense>
            <v-col cols="1">
              <v-list-subheader>标题：</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="state.title" :rules="nameRules" variant="outlined" required density="compact"></v-text-field>
              <!-- <div>
              <v-btn color="secondary" @click="submit" variant="flat">发布</v-btn>
            </div> -->
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="1">
              <v-list-subheader>封面：</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-file-input
                v-model="state.title"
                variant="outlined"
                prepend-icon=""
                accept="image/png, image/jpeg, image/bmp"
                required
                density="compact"
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
    </div>
    <v-divider></v-divider>
    <div>
      <div id="editor"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

import { addArticle } from '@/http/article'

const state = reactive({
  title: 'test',
  body: '',
})
let editor = reactive(null)

const initEditor = () => {
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '800px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
  })
}
const submit = () => {
  const body = editor.getMarkdown()
  console.log(body)
  const data = {
    title: state.title,
    body: body,
  }
  addArticle(data).then((res) => {
    console.log(res)
  })
}
onMounted(() => {
  initEditor()
})
</script>
