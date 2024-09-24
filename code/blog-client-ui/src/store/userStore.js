import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLogin } from '@/http/user'
import { get, post } from '@/http/request'
import { asyncRoute } from '@/router/dynamicRoute'

export const userInfo = defineStore(
  'info',
  () => {
    let user = ref()
    let isLogin = ref(false)
    const login = (data) => {
      return useLogin(data).then((res) => {
        if (res.data.status == 200) {
          isLogin.value = true
          localStorage.setItem('token', res.data.token)
          queryUserInfo()
          return res
        }
      })
    }
    const resgsiter = (data) => {
      return post('/api/user/regsiter', data)
    }
    const loginOut = () => {
      user.value = null
      isLogin.value = false
      localStorage.clear()
    }
    const queryUserInfo = () => {
      get('/api/user/info').then((res) => {
        user.value = res.data
      })
    }
    const emailVerify = (data) => {
      return get('/api/user/emailVerify', data)
    }
    const verifyInfo = (data) => {
      return get('/api/user/verifyInfo', data)
    }
    return { user, isLogin, login, resgsiter, queryUserInfo, loginOut, emailVerify, verifyInfo }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user'],
      key: 'piniaStore',
    },
  }
)
