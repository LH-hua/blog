<template>
  <div class="container">
    <v-container>
      <div class="top">
        <v-div style="height: 100%; display: flex; align-items: end">
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
        </v-div>
      </div>
    </v-container>

    <v-container>
      <side-main>
        <template #main>
          <v-btn-toggle v-model="toggle">
            <v-btn prepend-icon="mdi-book-information-variant" value="info">个人资料</v-btn>
            <v-btn prepend-icon="mdi-book-edit" value="editInfo">资料编辑</v-btn>
          </v-btn-toggle>
          <v-sheet class="pa-5" v-if="toggle == 'editInfo'" flat>
            <div>
              <v-text-field v-model="userFrom.username" density="compact" label="昵称" variant="outlined"></v-text-field>
              <v-text-field v-model="userFrom.email" density="compact" label="邮箱" variant="outlined"></v-text-field>
              <v-textarea v-model="userFrom.text" label="签名" variant="outlined"></v-textarea>
            </div>
          </v-sheet>
          <v-sheet class="pa-5" v-if="toggle == 'info'" flat>
          </v-sheet>
        </template>
        <template #side></template>
      </side-main>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userInfo } from '../../store/userStore'

const user = userInfo()
const toggle = ref('info')
const userFrom = ref({
  ...user.user,
})

const handlerChanger = (file) => {
  const img = file.target.files[0]
}

const handlerTo = (val) => {

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
