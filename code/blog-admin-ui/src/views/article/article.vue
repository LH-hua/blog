<template>
  <div>
    <v-table fixed-header height="100%">
      <thead>
        <tr>
          <th class="text-left">时间</th>
          <th class="text-left">标题</th>
          <th class="text-left">标签</th>
          <th class="text-left">作者</th>
          <th class="text-left">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in postList" :key="item">
          <td>{{ item.date }}</td>
          <td>{{ item.title }}</td>
          <td>
            <div class="d-flex ga-2">
              <v-chip color="primary" v-for="items in item.captcha" :key="items"> {{ items }} </v-chip>
            </div>
          </td>
          <td>{{ item.auther }}</td>
          <td>
            <div>
              <v-btn variant="flat" size="small" color="error"> 删 除 </v-btn>
              &nbsp;
              <v-btn v-bind="activatorProps" text="编 辑" variant="flat" size="small" color="secondary" @click="Query(item._id)"></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog v-model="state.dialog" width="1000" max-width="2000">
      <v-card>
        <v-toolbar title="文章编辑"></v-toolbar>
        <v-card-text>
          <editPost
            :title="state.detal.title"
            :id="state.detal._id"
            :body="state.detal.body"
            :cover="state.detal.cover"
            :captcha="state.detal.captcha"
            @ok="submit"
          ></editPost>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { reactive, computed, onMounted } from 'vue'
import { article, getPostDetal } from '@/http/article'

import editPost from '@/components/editArticle.vue'

const state = reactive({
  data: [],
  dialog: false,
  detal: {
    title: '',
    body: '',
    cover: '',
    captcha: [],
    _id: '',
  },
})

const submit = (val) => {
  console.log(val)
  state.dialog = false
}

const postList = computed(() => {
  console.log(state.data)
  return state.data
})

const getArticleList = () => {
  article().then((res) => {
    state.data = res.data.data
  })
}

const Query = (id) => {
  getPostDetal({ _id: id }).then((res) => {
    state.detal = res.data.data
    state.dialog = true
  })
}

onMounted(() => {
  getArticleList()
})
</script>
