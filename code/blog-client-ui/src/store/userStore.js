import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLogin } from '@/http/user'
import { get } from '@/http/request'
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
          localStorage.setItem('token', res.data.token)
          queryUserInfo()
          return res.data
        }
      })
    }
    const loginOut = () => {
      user.value = null
      isLogin.value = false
      localStorage.clear()
    }
    const queryUserInfo = () => {
      get('/api/user/info').then((res) => {
        console.log(res.data)
        user.value = res.data
      })
    }
    return { user, isLogin, login, queryUserInfo, loginOut }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['user'],
      key: 'piniaStore',
    },
  }
)
