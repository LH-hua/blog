<template>
  <v-sheet class="pa-5">
    <v-card flat>
      <v-card-title>
        <v-text-field label="输入标题" v-model="store.marticl.title"></v-text-field>
      </v-card-title>
      <v-card-text>
        <div ref="markedEdit" id="markedEdit"></div>
      </v-card-text>
      <v-card-actions>
        <div>
          <span style="margin-right: 20px;">文章字数：{{ store.marticl.textCount }}</span>
          <v-btn variant="outlined" @click="release">发布</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { formdata } from "@/http/request"
import { addArticle } from "@/http/article"

import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const store = reactive({
  markedown: null,
  dialog: false,
  marticl: {
    title: "",
    body: "",
    userId: "8",
    textCount:0
  },
});

onMounted(() => {
  initEdit();
});

function initEdit() {
  const options = {
    el: document.querySelector("#markedEdit"),
    height: "990px",
    initialEditType: "markdown",
    previewStyle: "vertical",
    placeholder: "使用markdown语法编辑内容......",
    hooks: {
      addImageBlobHook: (blob, callback) => {
        const formData = new FormData();
        formData.append("image", blob, "image.png");
        formdata('/api/user/post/upload-image',formData).then(res => {
          callback(res.data.src)
        }).catch(err => {
          callback(null)
        })
      },
    },
  };
  store.markedown = new Editor(options);
}

function release() {
  store.marticl.body = store.markedown.getMarkdown();
  // let marticl = store.marticl;
  // for (const key in marticl) {
  //   if (marticl[key] == "") {
  //     store.dialog = true;
  //     return;
  //   }
  // }
  console.log(store.marticl)
  addArticle(store.marticl).then((res) => {
    console.log(res);
  });
}
</script>
<style scoped lang="scss"></style>