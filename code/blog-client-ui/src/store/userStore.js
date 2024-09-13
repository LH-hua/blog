import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLogin } from '@/http/user'
import { asyncRoute } from '@/router/dynamicRoute'

export const userInfo = defineStore(
  'info',
  () => {
    let user = ref()
    let isLogin = ref(false)
    const login = (data) => {
      useLogin(data).then((res) => {
        if (res.data.status == 200) {
          isLogin.value = true
          user.value = res.data.data
          localStorage.setItem('token', res.data.token)
          return res.data
        }
      })
    }
    const loginOut = () => {
      user.value = null
      isLogin.value = false
      localStorage.clear()
    }
    return { user, isLogin, login, loginOut }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['user'],
      key: 'piniaStore',
    },
  }
)
