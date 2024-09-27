<template>
  <div class="container">
    <v-container>
      <div class="top">
        <div style="height: 100%; display: flex; align-items: end">
          <div class="user-info">
            <v-avatar size="x-large" class="user-avatar">
              <v-img :alt="user.user.username" :src="user.user.avatar"></v-img>
            </v-avatar>
            <div>
              <div class="font-weight-bold">{{ user.user.username }}</div>
              <div class="text">{{ user.user.text || '这个人有点懒，什么都没写！' }}</div>
              <div style="font-size: 10px">uid： {{ user.user._id }}</div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <side-main>
      <template #main>
        <v-sheet style="display: flex; gap: 10px">
          <v-list style="flex: 1">
            <v-list-subheader>个人中心</v-list-subheader>
            <v-divider></v-divider>
            <v-list-item @click="handlerTo('userpost')"> <v-icon icon="mdi-post-outline"></v-icon> 我的话题</v-list-item>
            <v-list-item @click="handlerTo('info')"> <v-icon icon="mdi-account"></v-icon> 我的信息</v-list-item>
            <v-list-item @click="handlerTo('account-circle')"> <v-icon icon="mdi-account-circle"></v-icon> 我的头像</v-list-item>
            <v-list-item @click="handlerTo('email')"> <v-icon icon="mdi-email"></v-icon> 邮箱更新</v-list-item>
            <v-list-item @click="handlerTo('password')"> <v-icon icon="mdi-account-lock-outline"></v-icon> 密码变更</v-list-item>
            <!-- <v-list-item @click="handlerTo('home')"><v-icon icon="mdi-home"></v-icon> 主 页</v-list-item> -->
            <!-- <v-list-item @click="handlerTo('dynamic')"><v-icon icon="mdi-microsoft-dynamics-365"></v-icon> 动 态</v-list-item> -->
          </v-list>
          <div style="flex: 7">
            <router-view></router-view>
          </div>
        </v-sheet>
      </template>
      <template #side>
        <publish></publish>
        <v-sheet style="margin-top: 10px" class="pa-5">
          <div style="display: flex; width: 100%; justify-content: space-around">
            <div>文章：{{ user.user.postTotal || 0 }}</div>
            <div>关注：{{ 0 }}</div>
          </div>
        </v-sheet>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userInfo } from '../../store/userStore'

import publish from '../../components/publish.vue'

const router = useRouter()
const route = useRoute()
const user = userInfo()
const tab = ref('option-1')
const userFrom = ref({
  ...user.user,
})

const handlerTo = async (val) => {
  await router.push({
    name: val,
  })
}
</script>

<style lang="scss" scoped>
.container {
  background: #edf2f7;
}
.top {
  height: 20vh;
  background-image: url('/image/bg.jpg');
  background-position-y: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  .user-info {
    width: 100%;
    padding: 10px;
    position: relative;
    display: flex;
    gap: 10px;
  }
  .text {
    color: #eeeeee;
  }
  .up-avatar input {
    display: none;
  }
  .up-avatar {
    display: none;
  }
  .file-label {
    display: block;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: #eeeeee;
  }
  .user-avatar:hover .up-avatar {
    position: absolute;
    display: block;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: 1px solid white;
  }
}
.container {
  min-height: 100vh;
}
</style>
