<template>
  <!-- <v-container> -->

  <div style="position: relative">
    <v-navigation-drawer>
      <v-list>
        <v-list-item prepend-avatar="/avatar/default.jpg" title="LH-hua"></v-list-item>
        <v-list-item> 众生皆草木，唯你是青山。 </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-arrow-left" title="返回" @click="back"></v-list-item>
        <v-divider></v-divider>
        <v-btn @click="release" color="#2196F3" block flat>发布</v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-sheet class="pa-5">
        <v-card flat>
          <v-card-title>
            <v-text-field density="compact" variant="underlined" label="输入标题" v-model="store.marticl.title"></v-text-field>
          </v-card-title>
          <v-card-text>
            <div ref="markedEdit" id="markedEdit"></div>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-main>
  </div>
  <!-- </v-container> -->
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { formdata } from '@/http/request'
import { addArticle } from '@/http/article'

import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const store = reactive({
  markedown: null,
  dialog: false,
  marticl: {
    discr: '',
    title: '',
    body: '',
    userId: '8',
    textCount: 0,
  },
})

onMounted(() => {
  initEdit()
})

function back() {
  window.history.back()
}

function initEdit() {
  const height = document.body.offsetHeight - 270 + 'px'
  const options = {
    el: document.querySelector('#markedEdit'),
    height: height,
    initialEditType: 'markdown',
    // toolbarItems:[],
    previewStyle: 'vertical',
    placeholder: '使用markdown语法编辑内容......',
    hooks: {
      addImageBlobHook: (blob, callback) => {
        const formData = new FormData()
        formData.append('image', blob, 'image.png')
        formdata('/api/user/post/upload-image', formData)
          .then((res) => {
            callback(res.data.src)
          })
          .catch((err) => {
            callback(null)
          })
      },
    },
  }
  store.markedown = new Editor(options)
}

function release() {
  store.marticl.body = store.markedown.getMarkdown()
  // let marticl = store.marticl;
  // for (const key in marticl) {
  //   if (marticl[key] == "") {
  //     store.dialog = true;
  //     return;
  //   }
  // }
  console.log(store.marticl)
  addArticle(store.marticl).then((res) => {
    if (res.data.status == 200) {
      // location.reload()
    }
    console.log(res)
  })
}
</script>
<style scoped lang="scss">
.footer {
  // position: sticky;
  // bottom: 10px;
}
</style>
