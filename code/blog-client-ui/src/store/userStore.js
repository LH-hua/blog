import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLogin } from '@/http/user'
import { get, post } from '@/http/request'
import { asyncRoute } from '@/router/dynamicRoute'

export const userInfo = defineStore(
  'info',
  () => {
    let user = ref({
      avatar: '/avatar/default.png',
    })
    let isLogin = ref(false)
    const login = (data) => {
      return new Promise((resolve, reject) => {
        useLogin(data).then((res) => {
          isLogin.value = true
          localStorage.setItem('token', res.data.token)
          queryUserInfo()
          resolve(res)
        })
      })
      // return useLogin(data).then((res) => {
      //   if (res.data.status == 200) {
      //     isLogin.value = true
      //     localStorage.setItem('token', res.data.token)
      //     queryUserInfo()
      //     return res
      //   }
      // })
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
    const userInfoUpdate = (data) => {
      post('/api/user/update', data).then((res) => {
        user.value = res.data
        return res
      })
    }
    const userAvatarUpload = (data) => {
      return post('/api/user/upload-avatar', data)
    }
    const emailVerify = (data) => {
      return get('/api/user/emailVerify', data)
    }
    const verifyInfo = (data) => {
      return get('/api/user/verifyInfo', data)
    }
    const userPostList = (data) => {
      return get('/api/post/list/user', data)
    }
    const userUpdateEmail = (data) => {
      return post('/api/user/updateEmail', data)
    }
    return {
      user,
      isLogin,
      login,
      resgsiter,
      queryUserInfo,
      userInfoUpdate,
      userAvatarUpload,
      loginOut,
      emailVerify,
      verifyInfo,
      userPostList,
      userUpdateEmail,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['user'],
      key: 'userPiniaStore',
    },
  }
)
