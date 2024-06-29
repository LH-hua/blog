<template>
  <div>
    <v-data-table :headers="table.headers" :items="table.items">
      <template v-slot:top>
        <v-toolbar flat>
          <v-row>
            <v-col cols="1">
              <v-list-subheader>文章标题</v-list-subheader>
            </v-col>
            <v-col cols="2">
              <v-text-field density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-list-subheader>分类标签</v-list-subheader>
            </v-col>
            <v-col cols="2">
              <v-text-field density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-list-subheader>
                <btn>查 询</btn>
              </v-list-subheader>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.captcha="item">
        <v-chip v-for="i in item.item.captcha" :key="i">{{ i }}</v-chip>
      </template>
      <template v-slot:item.cover="item">
        <v-img width="100px" height="100px" :src="item.item.cover"></v-img>
      </template>
      <template v-slot:item.actions="item">
        <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-tooltip text="真的要删除吗？">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { article, getPostDetal, deletePost } from '@/http/article'
import l from '@/util'

const table = reactive({
  headers: [
    { title: '文章标题', align: 'start', key: 'title' },
    { title: '文章描述', align: 'start', key: 'desc' },
    { title: '封面缩率图', align: 'start', key: 'cover' },
    { title: '分类标签', align: 'start', key: 'captcha' },
    { title: '操作', align: 'start', key: 'actions' },
  ],
  items: [],
})
const router = useRouter()
const editItem = (item) => {
  item = toRaw(item.item)
  router.push({
    path: `/editpost/${item._id}`,
    query: {
      id: item._id,
    },
  })
}

const deleteItem = (item) => {
  item = toRaw(item.item)
  deletePost({ _id: item._id }).then((res) => {
    l.showNotification('成功删除！', 'success')
    getArticleList()
  })
}
const getArticleList = () => {
  article().then((res) => {
    table.items = res.data.data
  })
}

onMounted(() => {
  getArticleList()
})
</script>
