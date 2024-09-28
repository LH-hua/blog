<template>
  <div class="containner">
    <side-main>
      <template #main>
        <v-sheet class="pa-5">
          <v-toolbar color="white" title="发起话题"></v-toolbar>
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="1" align-self="center">选择话题</v-col>
                <v-col cols="11">
                  <v-chip-group>
                    <v-chip class="ma-2" variant="text" label v-for="tab in captchas" :key="tab" @click="handlerCategorie(tab)">
                      {{ tab.name }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1" align-self="center">标题</v-col>
                <v-col cols="11">
                  <v-text-field
                    v-model="form.title"
                    density="compact"
                    variant="outlined"
                    placeholder="一个拥有标识度的标题能够更加的吸引人"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1">正文</v-col>
                <v-col cols="11">
                  <div class="container-editor">
                    <div id="editor"></div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <template v-slot:actions>
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="11">
                  <v-btn @click="save" variant="flat" color="#BDBDBD" text="保 存"></v-btn>
                  <v-btn @click="submit" variant="flat" color="#5865f2" text="提 交"></v-btn>
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-sheet>
      </template>
      <template #side>
        <v-sheet style="z-index: 0" class="pa-5">
          发帖提示
          <ul>
            <li>给你的贴子选择正确的分类</li>
            <li>鲜明的标题，好的标题更能够吸引人</li>
            <li>认真的书写你的正文，真诚是表达的前提</li>
            <li>允许转载，请在末尾给出原文链接</li>
          </ul>
        </v-sheet>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
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

import { addArticle, getCaptcha } from '@/http/article'
import { formdata } from '@/http/request'

const router = useRouter()
let editor
const captchas = ref()
const isFullscreen = ref(false)
let form = reactive({
  title: '',
  captcha_id: '',
  body: '',
})
const handlerCategorie = (val) => {
  form.captcha_id = val._id
}
const save = () => {
  const markdownText = editor.getMarkdown()
  form.body = markdownText
  const post = JSON.stringify(form)
  localStorage.setItem('post', post)
}
const submit = async () => {
  if (!form.title) {
    return
  }
  if (!form.captcha_id) {
    return
  }
  console.log(editor)

  const markdownText = editor.getMarkdown()
  form.body = markdownText
  console.log(form)

  addArticle(form).then((res) => {
    if (res.status == 200) {
      router.push({
        path: `/posts/${res.data.data._id}`,
      })
    }
    if (localStorage.getItem('post')) {
      localStorage.clear('post')
    }
  })
}
const initEditor = () => {
  function createLastButton() {
    const button = document.createElement('button')

    button.className = 'toastui-editor-toolbar-icons last'
    button.style.backgroundImage = 'none'
    button.style.margin = '0'
    button.innerHTML = `<i>全屏</i>`
    button.addEventListener('click', toggleFullscreen)
    // 切换全屏状态的函数
    function toggleFullscreen() {
      console.log(11)
      const editorContainer = document.querySelector('#editor')
      if (editorContainer.classList.contains('fullscreen')) {
        console.log('退出全屏')
        editor.setHeight('50vh')

        // 退出全屏
        editorContainer.classList.remove('fullscreen')
        // document.body.style.overflow = '' // 恢复页面滚动
      } else {
        console.log('全屏')
        // 进入全屏
        editorContainer.classList.add('fullscreen')
        editor.setHeight('90vh')
        document.body.style.overflow = 'hidden' // 禁用页面滚动
        document.addEventListener('keydown', function (event) {
          if (event.key === 'Escape' || event.keyCode === 27) {
            toggleFullscreen()
          }
        })
      }
    }

    return button
  }
  editor = new Editor({
    el: document.querySelector('#editor'),
    height: '50vh',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'image', 'link'],
      ['code', 'codeblock'],
      // Using Option: Customize the last button
      [
        {
          el: createLastButton(),
          command: 'bold',
          tooltip: '全屏/ESC键退出',
        },
      ],
    ],
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
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
  if (localStorage.getItem('post')) {
    form = JSON.parse(localStorage.getItem('post'))
  }
  initEditor()
  getCaptcha().then((res) => {
    captchas.value = res.data
  })
})
</script>
<style lang="scss">
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
  ul {
    color: rgba(0, 0, 0, 0.5);
    padding: 20px;
  }
}
.container-editor {
  background-color: white;
}
.fullscreen {
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1500;
  background-color: white;
}
</style>
