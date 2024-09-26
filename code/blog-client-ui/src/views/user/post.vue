<template>
  <div>
    <v-toolbar color="white" density="compact" title="我的话题"></v-toolbar>
    <v-divider></v-divider>
    <v-list v-if="store.length > 0">
      <v-list-item v-for="item in store" :key="item._id">
        <v-list-title>{{ item.title }}</v-list-title>
        <v-list-item-subtitle>
          <v-chip density="compact" color="primary" size="small"> {{ item.captchas_info.name }} </v-chip> · <span>{{ item.readcount }} 阅读</span> ·
        </v-list-item-subtitle>
        <v-list-item-media>
          <div style="display: flex; justify-content: end">
            <v-btn variant="text" density="compact" color="blue" @click="handlerEdit(item)">修改</v-btn>
            <v-tooltip text="删除？" location="top">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="text" density="compact" color="red" @click="handlerDel(item)">删除</v-btn>
              </template>
            </v-tooltip>
          </div>
          <v-divider></v-divider>
        </v-list-item-media>
      </v-list-item>
    </v-list>
    <div v-else>你还没有发布话题哦</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userInfo } from '../../store/userStore'
import { postDel } from '../../http/article'

let store = ref([])
const route = useRoute()
const router = useRouter()
const user = userInfo()

const handlerEdit = (item) => {
  router.push({ path: `/posts/edit/${item._id}` })
}

const handlerDel = (item) => {
  postDel({ _id: item._id }).then((res) => {
    if (res.status == 200) {
      query()
    }
  })
}

const query = () => {
  user.userPostList({ u_id: route.params.id }).then((res) => {
    console.log(res)
    store.value = res.data
  })
}
onMounted(() => {
  query()
})
</script>
