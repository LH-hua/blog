<template>
  <div class="user-container">
    <v-btn flat block @click="onTo">记录一下</v-btn>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" class="me-10 ms-4" style="cursor: pointer" size="40" :src="store.user.avatar || '/avatar/default.jpg'">
          <v-img :src="store.user.avatar || '/avatar/default.jpg'"></v-img>
        </v-avatar>
      </template>
      <v-card flat>
        <v-card-title>
          <span>LH-hua</span>
        </v-card-title>
        <v-card-text>
          <v-btn flat block>个人信息</v-btn>
        </v-card-text>

        <v-card-actions>
          <v-divider></v-divider>
          <v-btn block @click="exit">退 出</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const store = reactive({ user: JSON.parse(localStorage.getItem('user')) })
const router = useRouter()

function onTo() {
  router.push('/post/add')
}
function exit() {
  localStorage.clear()
  location.reload()
}
</script>

<style scoped>
.user-container {
  display: flex;
}
</style>
