<template>
  <div style="position: relative;">
    <v-sheet class="pa-5">
      <v-card flat>
        <v-card-title>
          <v-text-field density="compact" variant="outlined" label="输入标题" v-model="store.marticl.title"></v-text-field>
        </v-card-title>
        <v-card-text>
          <div style="display:flex;align-items: center;justify-content: space-between;">
            <v-textarea v-model="store.marticl.discr" rounded="true" density="compact" placeholder="用几句话描述或者总结一下"
              label="描述/总结" variant="outlined"></v-textarea>
            <div style="width:50%;display: flex;align-items:center;justify-content: end;">
              <span style="margin-right: 20px;">文章字数：{{ store.marticl.textCount }}</span>
              <v-btn @click="release" color="#2196F3" flat>发布</v-btn>
            </div>
          </div>
          <div ref="markedEdit" id="markedEdit"></div>
        </v-card-text>
      </v-card>
    </v-sheet>
  </div>
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
    discr: "",
    title: "",
    body: "",
    userId: "8",
    textCount: 0
  },
});

onMounted(() => {
  initEdit();
});

function initEdit() {
  const height = (document.body.offsetHeight - 270) + 'px'
  const options = {
    el: document.querySelector("#markedEdit"),
    height: height,
    initialEditType: "markdown",
    previewStyle: "vertical",
    placeholder: "使用markdown语法编辑内容......",
    hooks: {
      addImageBlobHook: (blob, callback) => {
        const formData = new FormData();
        formData.append("image", blob, "image.png");
        formdata('/api/user/post/upload-image', formData).then(res => {
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
    if (res.data.status == 200) {
      // location.reload()
    }
    console.log(res);
  });
}
</script>
<style scoped lang="scss">
.footer {
  // position: sticky;
  // bottom: 10px;
}
</style>