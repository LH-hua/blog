<template>
  <div class="container">
    <div class="top">
      <v-container style="height: 100%; display: flex; align-items: end">
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
            <div style="font-size: 10px;">uid： {{ user.user._id }}</div>
          </div>
        </div>
      </v-container>
    </div>
    <v-container>
      <v-card flat>

        <div class="d-flex flex-row">
          <v-tabs v-model="tab" color="primary" direction="vertical" slider-color="#eeeeee">
            <v-tab prepend-icon="mdi-account" text="头像" value="option-1"></v-tab>
            <v-tab prepend-icon="mdi-account" text="昵称" value="option-2"></v-tab>
            <v-tab prepend-icon="mdi-account" text="签名" value="option-3"></v-tab>
            <v-tab prepend-icon="mdi-account" text="邮箱" value="option-4"></v-tab>
            <v-tab prepend-icon="mdi-account" text="密码" value="option-5"></v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab" style="width: 100%">
            <v-tabs-window-item value="option-1">
              <v-card flat>
                <v-card-text>
                  <v-text-field v-model="userFrom.username" density="compact" label="昵称" variant="outlined"></v-text-field>
                  <v-text-field v-model="userFrom.email" density="compact" label="邮箱" variant="outlined"></v-text-field>
                  <v-textarea v-model="userFrom.text" label="签名" variant="outlined"></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-btn variant="tonal"> 保 存 </v-btn>
                </v-card-actions>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userInfo } from '../../store/userStore'

const user = userInfo()
const tab = ref('option-1')
const userFrom = ref({
  ...user.user,
})

const handlerChanger = (file) => {
    const img = file.target.files[0]
}
</script>

<style lang="scss" scoped>
.top {
  height: 20vh;
  background-image: url('/image/bg.jpg');
  background-position-y: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  .user-info {
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
  .file-label{
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
