<template>
  <div class="container-editor">
    <div v-if="type == 'editor'">
      <div id="editor"></div>
      <v-btn @click="cancel" variant="flat" color="#BDBDBD" text="取 消"></v-btn>
      <v-btn @click="submit" variant="flat" color="#5865f2" text="提 交"></v-btn>
    </div>
    <div v-if="type == 'viewer'">
      <div id="viewer"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, defineEmits, defineProps, watchEffect, nextTick } from 'vue'

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
import { formdata } from '@/http/request'

let editor
const emits = defineEmits(['content', 'cancel'])
const { type, markdownContent } = defineProps(['type', 'markdownContent'])

watch(
  () => markdownContent,
  () => {
    console.log(markdownContent)
    editor.setMarkdown(markdownContent)
  },
  {
    // immediate:true
    deep: true,
  }
)
const cancel = () => {
  emits('cancel')
}
const submit = () => {
  const Text = editor.getMarkdown()
  emits('content', Text)
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
    initialValue: markdownContent,
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

const initViewer = () => {
  editor = Editor.factory({
    el: document.querySelector('#viewer'),
    viewer: true,
    height: '50vh',
    initialValue: markdownContent,
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
  })
}
watchEffect(async () => {
  await nextTick()
  if (type == 'editor') {
    initEditor()
  } else {
    initViewer()
  }
})
onMounted(() => {})
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
