<template>
  <div>
    <v-data-table :headers="table.headers" :items="table.items">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-row>
              <v-col cols="1">
                <v-list-subheader>标题</v-list-subheader>
              </v-col>
              <v-col cols="2">
                <v-text-field density="compact" variant="outlined" hide-details></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-list-subheader>分类</v-list-subheader>
              </v-col>
              <v-col cols="2">
                <v-text-field density="compact" variant="outlined" hide-details></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-list-subheader>
                  <v-btn prepend-icon="mdi-magnify" variant="flat" color="blue-lighten-2">查 询</v-btn>
                </v-list-subheader>
              </v-col>
            </v-row></v-toolbar-title
          >

          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item.captcha="item">
        <v-chip v-for="i in item.item.captcha" :key="i">{{ i }}</v-chip>
      </template>
      <template v-slot:item.cover="item">
        <v-img width="50px" height="50px" :src="item.item.cover"></v-img>
      </template> -->
      <template v-slot:item.publicShow="item">
        <v-switch v-model="item.item.publicShow" color="success" @update:modelValue="(e) => handlerSwitch(e, item)" hide-details></v-switch>
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
import { article, getPostDetal, deletePost,addArticle } from '@/http/article'
import l from '@/util'

const table = reactive({
  headers: [
    { title: '文章标题', align: 'start', key: 'title' },
    { title: '阅读量', align: 'start', key: 'readcount' },
    { title: '话题', align: 'start', key: 'captchas_info.name' },
    { title: '审核发布', align: 'start', key: 'publicShow' },
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
const handlerSwitch = (e, item) => {
  console.log(e, item)
  item.item.publicShow = e
  addArticle(item.item).then(res => {
    console.log(res)
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
