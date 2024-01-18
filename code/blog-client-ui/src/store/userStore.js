import { defineStore } from 'pinia'
import { useLogin } from '@/http/user'
import { asyncRoute } from '@/router/dynamicRoute'

export const userInfo = defineStore('info', {
  state: () => ({
    info: {},
    isLogin: false,
  }),
  getters: {
    userStatus: (state) => state.isLogin,
  },
  actions: {
    async useLogin(data) {
      try {
        const res = await useLogin(data)
        if (res.data.status == 200) {
          this.isLogin = true
          this.info = res.data.data
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          asyncRoute(res.data.token)
          return { info: this.info, satus: true }
        }
      } catch (error) {
        return { info: error, satus: false }
      }
    },
    changeStatus() {
      this.isLogin = true
    },
  },
})
