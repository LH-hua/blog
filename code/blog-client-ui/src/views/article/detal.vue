<template>
  <div>
    <v-card :title="data.data.title" :subtitle="data.data.date" flat>
      <v-card-text>
        <div class="typo">
            <div v-html="data.data.body"></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/scss/tokyo-night-light.scss";
import "@/assets/css/typo.css"

import { getArticleDetal } from "@/http/article";

const data = reactive({ data: {} });

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
    )
  }
});
onMounted(() => {
  const postId = route.params.id;
  getArticleDetal({ _id: postId }).then((res) => {
    res.body = md.render(res.body);
    data.data = res;
  });
});
</script>

<style leng="less" scoped>
/* @import '../../assets/css/typo.css'; */
</style>
