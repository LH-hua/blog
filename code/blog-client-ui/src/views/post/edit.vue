<template>
  <div class="containner">
    <side-main>
      <template #main>
        <v-sheet class="pa-5">
          <v-toolbar color="white" title="话题修改"></v-toolbar>
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="1" align-self="center">选择话题</v-col>
                <v-col cols="11">
                  <v-chip-group v-model="form.captcha_id">
                    <v-chip class="ma-2" variant="text" label v-for="tab in captchas" :key="tab" :value="tab._id" @click="handlerCategorie(tab)">
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
                  <edit type="editor" :markdownContent="form.body" @content="submit"></edit>
                  <!-- <div id="editor"></div> -->
                </v-col>
              </v-row>
            </v-card-text>
            <!-- <template v-slot:actions>
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="11">
                  <v-btn @click="submit" variant="flat" color="#5865f2" text="提 交"></v-btn>
                </v-col>
              </v-row>
            </template> -->
          </v-card>
        </v-sheet>
      </template>
      <template #side>
        <v-sheet class="pa-5">
          <v-card flat>
            <v-card-title> 发帖提示 </v-card-title>
            <v-card-text>
              <ul>
                <li>给你的贴子选择正确的分类</li>
                <li>鲜明的标题，好的标题更能够吸引人</li>
                <li>认真的书写你的正文，真诚是表达的前提</li>
                <li>允许转载，请在末尾给出原文链接</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-sheet>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import edit from '../../components/edit.vue'

import { addArticle, getCaptcha, getArticleDetal } from '@/http/article'

const router = useRouter()
const route = useRoute()
const captchas = ref()
let form = ref({
  title: '',
  captcha_id: '',
  body: '',
})
const handlerCategorie = (val) => {
  form.value.captcha_id = val._id
}
const submit = (text) => {
  if (!form.value.title) {
    return
  }
  if (!form.value.captcha_id) {
    return
  }

  form.value.body = text
  addArticle(form.value).then((res) => {
    if (res.status == 200) {
      window.history.back()
    }
  })
}
onBeforeMount(async () => {
  const postId = route.params.id
  const res = await getArticleDetal({ _id: postId })
  form.value = res.data
  document.title = res.data.title
  getCaptcha().then((res) => {
    captchas.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
  ul {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
