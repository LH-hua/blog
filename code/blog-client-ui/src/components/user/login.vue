<template>
  <div>
    <div v-if="user.isLogin">
      <v-menu transition="slide-y-transition" open-on-hover>
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" @click="handlerUserSpace">
            <v-img :src="user.user.avatar" :alt="user.user.username"></v-img>
          </v-avatar>
        </template>
        <v-card>
          <v-card-title>
            <div class="d-flex justify-center align-center">
              <v-avatar v-bind="props">
                <v-img :src="user.user.avatar" :alt="user.user.username"></v-img>
              </v-avatar>
              <v-list lines="two">
                <v-list-item :title="user.user.username" :subtitle="user.user.desc || '这人有点懒，什么也没写！'"></v-list-item>
              </v-list>
            </div>
            <v-divider></v-divider>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title> <router-link :to="'/user/' + user.user._id">个人信息</router-link></v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="quit">推出登录</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-btn variant="text" color="blue" @click="handlerPublish"> 发布 </v-btn>
    </div>
    <div v-else>
      <v-btn color="primary" text="注 册" variant="text" @click="regsiter">登 录 | 注 册</v-btn>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'

import { userInfo } from '@/store/userStore'
import { useRouter } from 'vue-router'
const user = userInfo()
const router = useRouter()

const rules = ref({
  nameRequired: (value) => !!value || '用户名不能为空',
  passwordRequired: (value) => !!value || '密码不能为空',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
})
const tab = ref('')
const isActive = ref(false)
const data = reactive({
  msg: '',
  userName: '',
  userPassword: '',
})

const quit = () => {
  user.loginOut()
}
const handlerPublish = () => {
  router.push('/publish')
}
const regsiter = () => {
  router.push('/user/login')
}
const handlerUserSpace = () => {
  router.push(`/userSpace/${user.user._id}`)

}
const handleLogin = async () => {
  const res = await user.login({ username: data.userName, password: data.userPassword })
  if (res.status == 200) {
    isActive.value = false
  }
}

onMounted(() => {})
</script>
