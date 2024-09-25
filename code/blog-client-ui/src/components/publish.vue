<template>
  <v-sheet class="pa-5">
    <!-- <v-btn color="#f5f5f5" variant="flat" block @click="categories"> 添 加 话 题 </v-btn>
    <br /> -->
    <v-btn color="#f5f5f5" variant="flat" block @click="publish" prepend-icon="mdi-clipboard-edit-outline"> 发 布 文 章 </v-btn>
  </v-sheet>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userInfo } from '@/store/userStore'
const user = userInfo()

const router = useRouter()


const publish = () => {
  if (!user.isLogin) {
    return router.push('/user/login')
  }
  router.push('/posts/new')
}
const categories = () => {
  router.push('/categories/new')
}
</script>
