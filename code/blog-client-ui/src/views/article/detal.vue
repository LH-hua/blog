<template>
  <side-main>
    <template #right>
      <div style="align-self: flex-start; position: sticky; top: 65px">
        <v-sheet rounded="lg">
          <v-card flat>
            <v-card-title>
              <v-icon>mdi-account</v-icon>
            </v-card-title>
            <v-card-subtitle>
              {{ store.user.signature || "还没想好呢" }}
            </v-card-subtitle>
          </v-card>
        </v-sheet>
        <br />
        <v-sheet>
          <v-card flat>
            <v-card-title>目录</v-card-title>
            <v-card-text>
              <div class="table-of-contents"></div>
            </v-card-text>
          </v-card>
        </v-sheet>
      </div>
    </template>

    <template #main>
      <v-sheet class="pa-5">
        <v-card
          :title="store.data.title"
          :subtitle="store.data.date"
          flat
          min-height="900px"
        >
          <v-card-text>
            <div class="typo">
              <div v-html="store.data.body"></div>
            </div>
          </v-card-text>
        </v-card>
      </v-sheet>
    </template>
  </side-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import hljs from "highlight.js";
// import "highlight.js/scss/tokyo-night-light.scss";
import "@/assets/css/typo.css";

import { getArticleDetal } from "@/http/article";

const store = reactive({
  data: {
    title: "",
    date: "",
    body: "",
  },
  user: {},
});

const md = ref(null);

const route = useRoute();

function initMd() {
  const left = document.querySelector(".table-of-contents");
  md.value = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' +
        md.value.utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
  })
    .use(anchor, { permalink: true, permalinkBefore: true })
    .use(toc, {
      callback: function (html, ast) {
        console.log(html);
        //把目录单独列出来
        left.innerHTML = html;
        allADemo();
      },
    });
}

function allADemo() {
  const allA = document.querySelectorAll(".table-of-contents a");
  allA.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.style.Color = 'red'
      item.scrollIntoView(true);
    });
  });
}

function getData() {
  const postId = route.params.id;
  getArticleDetal({ _id: postId }).then((res) => {
    res.data.body = md.value.render(res.data.body);
    store.data = res.data;
  });
}

onMounted(() => {
  initMd();
  getData();
});
</script>

<style leng="less" scoped>
/* @import '../../assets/css/typo.css'; */

</style>
