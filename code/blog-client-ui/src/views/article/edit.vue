<template>
  <v-sheet class="pa-5">
    <div class="container">
      <div class="container_title">
        <div class="container_title_left">
          <v-text-field
            label="标题"
            v-model="store.marticl.title"
          ></v-text-field>
        </div>
        <div class="container_title_right">
          <v-btn color="primary" depressed @click="release">发布</v-btn>
        </div>
      </div>
      <div ref="markedEdit" id="markedEdit"></div>
      <v-dialog v-model="store.dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> 提示： </v-card-title>
          <v-card-text>
            <div style="padding: 20px 0">内容为空或者内容不完整。。。</div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="store.dialog = false">
              了 解
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-sheet>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const store = reactive({
  markedown: null,
  dialog: false,
  marticl: {
    title: "",
    body: "",
    userId: "8",
  },
});

onMounted(() => {
  initEdit();
});

function initEdit() {
  const options = {
    el: document.querySelector("#markedEdit"),
    height: "770px",
    initialEditType: "markdown",
    previewStyle: "vertical",
    placeholder: "使用markdown语法编辑内容......",
  };
  store.markedown = new Editor(options);
}

function release() {
  store.marticl.body = store.markedown.getMarkdown();
  let marticl = store.marticl;
  for (const key in marticl) {
    if (marticl[key] == "") {
      store.dialog = true;
      return;
    }
  }
  post("/api/post/add/articles", store.marticl).then((res) => {
    console.log(res);
  });
}
</script>
<style scoped lang="scss">
.container_title {
  display: flex;
  &_left {
    flex: 9;
  }
  &_right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
