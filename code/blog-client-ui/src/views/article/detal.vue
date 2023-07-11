<template>
  <side-main>
    <template #right>
      <v-sheet rounded="lg">
        <v-card flat>
          <v-card-title>
            <v-icon>mdi-account</v-icon>
          </v-card-title>
          <v-card-subtitle>
            {{ store.user.signature || '还没想好呢' }}
          </v-card-subtitle>
        </v-card>
      </v-sheet>
      <br />
      <v-sheet>
        <v-card flat>
          <v-card-title>目录</v-card-title>
          
        </v-card>
      </v-sheet>
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
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";
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
  user:{

  }
});


const route = useRoute();

const md = new MarkdownIt({
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
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
onMounted(() => {
  const postId = route.params.id;
  getArticleDetal({ _id: postId }).then((res) => {
    res.data.body = md.render(res.data.body);
    store.data = res.data;
  });
});
</script>

<style leng="less" scoped>
/* @import '../../assets/css/typo.css'; */
</style>
