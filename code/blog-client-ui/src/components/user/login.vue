<template>
  <div>
    <div v-if="user.isLogin">
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props">
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
                <v-list-item-title> 个人信息</v-list-item-title>
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
      <v-dialog max-width="800" v-model="isActive" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" color="primary" text="登 录" variant="text"></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-sheet class="pa-5">
            <div style="display: flex; gap: 10px">
              <div style="flex: 1; height: 100%">
                <v-img style="height: 100%" cover src="/image/cut-password-manager-information-security.png"></v-img>
              </div>
              <div style="flex: 1">
                <v-card flat>
                  <v-card-title class="d-flex justify-space-between align-center">
                    <span class="text-h4 font-weight-bold">登 录</span>

                    <v-btn icon="mdi-close" variant="text" @click="isActive.value = false"></v-btn>
                  </v-card-title>
                  <v-divider></v-divider>
                  <div class="pa-2">
                    <v-text-field
                      v-model="data.userName"
                      type="text"
                      label="用户名"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      density="compact"
                      required
                      :rules="[rules.nameRequired]"
                    ></v-text-field>
                    <br />
                    <v-text-field
                      v-model="data.userPassword"
                      type="password"
                      label="密码"
                      variant="outlined"
                      prepend-inner-icon="mdi-shield-key"
                      density="compact"
                      required
                      :rules="[rules.passwordRequired]"
                    ></v-text-field>
                    <v-btn block variant="tonal" color="primary" text="登 录" @click="handleLogin"></v-btn>
                  </div>
                </v-card>
              </div>
            </div>
          </v-sheet>
        </template>
      </v-dialog>
      <v-btn color="primary" text="注 册" variant="text" @click="regsiter">
      </v-btn>
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
  router.push('/regsiter')
}
const handleLogin = async () => {
  const res = await user.login({ username: data.userName, password: data.userPassword })
  if (res.status == 200) {
    isActive.value = false
  }
}

onMounted(() => {})
</script>
