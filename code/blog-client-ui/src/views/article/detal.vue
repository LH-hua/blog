<template>
  <two-col1>
    <template #main>
      <v-card flat>
        <v-card-title><h3>{{ state.data.title }}</h3></v-card-title>
        <v-card-subtitle>{{ state.data.date }}</v-card-subtitle>
        <v-card-text v-html="mardownRender(state.data.body)"></v-card-text>
      </v-card>
    </template>
    <template #side>
      <v-card class="mx-auto"  flat>
        <v-img
          class="align-end text-white"
          height="200"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        >
        </v-img>
        <v-card-text>
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>
      </v-card>
    </template>
  </two-col1>
</template>

<script setup>
import { reactive, onMounted,computed } from "vue";
import { useRoute, useRouter } from "vue-router"
import {detail} from '@/http/article'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import "highlight.js/scss/docco.scss";


const route = useRoute();
const router = useRouter();

const state = reactive({
  data: {
    title:'',
    date:'',
    body:''
  },
});

computed(() => {
  
})
const mardownRender = (val) => {
      const md = new MarkdownIt({
        html: true,
        linkify: true,
        langPrefix:'javascript',
        typographer: true,
        highlight: function (str, lang) {
          console.log(lang)
          // 此处判断是否有添加代码语言
          if (lang && hljs.getLanguage(lang)) {
            try {
              // 得到经过highlight.js之后的html代码
              const preCode = hljs.highlight(lang, str, true).value;
              console.log(preCode)
              // 以换行进行分割
              const lines = preCode.split(/\n/).slice(0, -1);
              // 添加自定义行号
              let html = lines
                .map((item, index) => {
                  return (
                    '<li><span class="line-num" data-line="' +
                    (index + 1) +
                    '"></span>' +
                    item +
                    "</li>"
                  );
                })
                .join("");
              html = "<ol>" + html + "</ol>";
              // 添加代码语言
              if (lines.length) {
                html += '<b class="name">' + lang + "</b>";
              }
              return '<pre class="hljs"><code>' + html + "</code></pre>";
            } catch (error) {
              console.log(error)
            }
          }
          // 未添加代码语言，此处与上面同理
          const preCode = md.utils.escapeHtml(str);
          const lines = preCode.split(/\n/).slice(0, -1);
          let html = lines
            .map((item, index) => {
              return (
                '<li><span class="line-num" data-line="' +
                (index + 1) +
                '"></span>' +
                item +
                "</li>"
              );
            })
            .join("");
          html = "<ol>" + html + "</ol>";
          console.log(html)
          return '<pre class="hljs" style="padding:10px"><code>' + html + "</code></pre>";
        },
      });
      const result = md.render(val);
      console.log(result)
      return result;
    }
onMounted(() => {
  const id = router.currentRoute.value.params.id;
  console.log(id)
  detail({_id:id}).then(res => {
    state.data = res.data
  })
});
</script>