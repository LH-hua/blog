<template>
  <div class="container">
    <v-container>
      <div class="top">
        <div style="height: 100%; display: flex; align-items: end">
          <div class="user-info">
            <v-avatar size="x-large" class="user-avatar">
              <v-img :alt="user.user.username" :src="user.user.avatar"></v-img>
              <span class="up-avatar">
                <input type="file" id="file-input" @change="handlerChanger" />
                <label for="file-input" class="file-label">
                  <v-icon icon="mdi-cloud-upload-outline"></v-icon>
                </label>
              </span>
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
        <v-sheet class="pa-5">
          <v-btn-toggle rounded="0">
            <v-btn prepend-icon="mdi-home" @click="handlerTo('info')">主 页</v-btn>
            <v-btn prepend-icon="mdi-math-norm-box" @click="handlerTo('dynamic')">动 态</v-btn>
          </v-btn-toggle>
          <router-view></router-view>
        </v-sheet>
      </template>
      <template #side>
        <v-sheet class="pa-5">
          <div style="display: flex; width: 100%; justify-content: space-around">
            <div>文章：{{}}</div>
            <div>关注：{{}}</div>
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

const router = useRouter()
const route = useRoute()
const user = userInfo()
const tab = ref('option-1')
const userFrom = ref({
  ...user.user,
})

const handlerChanger = (file) => {
  const img = file.target.files[0]
}

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
