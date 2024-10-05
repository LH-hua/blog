<template>
  <div>
    <v-data-table :headers="table.headers" :items="table.items">
      <template v-slot:top>
        <!-- <v-toolbar flat>
          <v-toolbar-title>
</v-toolbar-title
          >

          <v-spacer></v-spacer>
        </v-toolbar> -->
        <div class="table-header-container">
          <div class="item">
            <v-text-field density="compact" variant="outlined" v-model="params.title" hide-details>
              <template #prepend> 标题 </template>
            </v-text-field>
          </div>
          <div class="item">
            <v-select
              v-model="params.captcha_id"
              :items="captcha_list"
              density="compact"
              item-title="name"
              variant="outlined"
              item-value="_id"
              label=""
              single-line
            >
              <template #prepend> 分类 </template>
            </v-select>
          </div>
          <div class="btn">
            <v-btn prepend-icon="mdi-magnify" variant="flat" color="blue-lighten-2" @click="query">查 询</v-btn>
          </div>
        </div>
        <!-- <v-row>
          <v-col cols="1">
            <v-list-subheader>标题</v-list-subheader>
          </v-col>
          <v-col cols="2">
            <v-text-field density="compact" variant="outlined" v-model="params.title" hide-details></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-list-subheader>分类</v-list-subheader>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="params.captcha_id"
              :items="captcha_list"
              density="compact"
              item-title="name"
              variant="outlined"
              item-value="_id"
              label=""
              single-line
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-list-subheader>
              <v-btn prepend-icon="mdi-magnify" variant="flat" color="blue-lighten-2" @click="query">查 询</v-btn>
            </v-list-subheader>
          </v-col>
        </v-row> -->
      </template>
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
import { article, getPostDetal, deletePost, addArticle, getCaptcha } from '@/http/article'
import l from '@/util'

const table = reactive({
  headers: [
    { title: '文章标题', align: 'start', key: 'title' },
    { title: '作者', align: 'start', key: 'auther.username' },
    { title: '阅读量', align: 'start', key: 'readcount' },
    { title: '话题', align: 'start', key: 'captchas_info.name' },
    { title: '审核发布', align: 'start', key: 'publicShow' },
    { title: '操作', align: 'start', key: 'actions' },
  ],
  items: [],
})
const params = ref({
  title: '',
  captcha_id: '',
})
let captcha_list = reactive([])
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

const query = () => {
  article(params.value).then((res) => {
    table.items = res.data.data
  })
}
const handlerSwitch = (e, item) => {
  console.log(e, item)
  item.item.publicShow = e
  addArticle(item.item).then((res) => {
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
  getCaptcha().then((res) => {
    captcha_list = res.data.data
  })
})
</script>

<style lang="scss" scoped>
.table-header-container {
  display: flex;
  gap: 10px;
  .item{
    flex: 2;
  }
  .btn{
    flex: 6;
  }
}
</style>
