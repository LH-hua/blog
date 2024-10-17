// main.js 或 main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import { userInfo, userDataList, useGlobStore } from './store'

import router from './router/index.js'
import { vuetify } from './plugin'

// 自定义样式
import '@/style/global.css'

// 布局组件
import sideMain from '@/layout/sideMain.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component('sideMain', sideMain)

app.use(pinia)
app.use(router)
app.use(vuetify)

const user = userInfo()
const dataList = userDataList()

if (user.isLogin) {
  user.queryUserInfo()
}
// 获取数据
dataList.queryPost()
dataList.queryCaptcha()

app.mount('#app')
