<template>
  <v-sheet class="pa-2 bg">
    <v-card flat>
      <v-toolbar density="compact" flat>
        <v-toolbar-title>
          <v-btn color="secondary"  variant="tonal" @click="handleradd"> 新增 </v-btn>

          {{ state.title }}</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-btn color="secondary" @click="handlerReturn"> 返回 </v-btn>
      </v-toolbar>
    </v-card>
    <br />
    <v-table v-if="state.showContent === 'list'" fixed-header height="100%" class="pa-2">
      <thead>
        <tr>
          <th class="text-left">时间</th>
          <th class="text-left">标题</th>
          <th class="text-left">标签</th>
          <th class="text-left">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in postList" :key="item">
          <td>{{ timeFormat(item.date) }}</td>
          <td>{{ item.title }}</td>
          <td>
            <div class="d-flex ga-2">
              <v-chip color="primary" v-for="items in item.captchas" :key="items"> {{ items.captcha }} </v-chip>
            </div>
          </td>
          <td>
            <div>
              <v-btn variant="flat" size="small" color="error" icon="mdi-delete-outline"></v-btn>
              &nbsp;
              <v-btn
                v-bind="activatorProps"
                icon="mdi-application-edit-outline"
                variant="flat"
                size="small"
                color="secondary"
                @click="Query(item._id)"
              ></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-card v-else-if="state.showContent === 'edit'" flat>
      <v-card-text>
        <editPost
          :title="state.detal.title"
          :id="state.detal._id"
          :body="state.detal.body"
          :cover="state.detal.cover"
          :captchas="state.detal.captchas"
          @ok="submit"
        ></editPost>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <editPost
          :title="state.detal.title"
          :id="state.detal._id"
          :body="state.detal.body"
          :cover="state.detal.cover"
          :captchas="state.detal.captchas"
          @ok="submit"
        ></editPost>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script setup>
import { reactive, computed, onMounted } from 'vue'
import moment from 'moment'
import { article, getPostDetal } from '@/http/article'

import editPost from '@/components/editArticle.vue'

const state = reactive({
  data: [],
  title: '列表',
  showContent: 'list',
  dialog: false,
  detal: {
    title: '',
    body: '',
    cover: '',
    captcha: [],
    _id: '',
  },
})

const handleradd = () => {
  state.showContent = 'add'

}
const handlerReturn = () => {
  state.showContent = 'list'
}
const timeFormat = (val) => {
  return moment(val).format('YYYY-MM-DD HH:mm')
}
const submit = (val) => {
  handlerReturn()
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
    state.showContent = 'edit'
    state.title = '文章编辑'
    state.dialog = true
  })
}

onMounted(() => {
  getArticleList()
})
</script>

<style scoped>
.bg {
  background-color: transparent;
  backdrop-filter: blur(10px);
}
.v-table {
  background: rgba(255, 255, 255, 0.8);
}
</style>
