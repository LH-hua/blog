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
                  <edit markdownContent="fsdafsdafdsfa" type="editor" @content="submit" @cancel="cancel"></edit>
                </v-col>
              </v-row>
            </v-card-text>
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

import edit from '../../components/edit.vue'

import { addArticle, getCaptcha } from '@/http/article'
import { formdata } from '@/http/request'

const router = useRouter()
const captchas = ref()
let form = reactive({
  title: '',
  captcha_id: '',
  body: '',
})
const handlerCategorie = (val) => {
  form.captcha_id = val._id
}
const submit = async (content) => {
  if (!form.title) {
    return
  }
  if (!form.captcha_id) {
    return
  }
  form.body = content
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

onMounted(() => {
  if (localStorage.getItem('post')) {
    form = JSON.parse(localStorage.getItem('post'))
  }
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
</style>
