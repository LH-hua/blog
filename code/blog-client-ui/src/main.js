import { createApp } from 'vue'
import pinia from './store'
import App from './App.vue'

import router from './router/index.js'
import { vuetify } from './plugin'

// 自定义样式
import '@/style/global.css'

// 布局组件
import sideMain from '@/layout/sideMain.vue'

import { asyncRoute } from '@/router/dynamicRoute'
if (localStorage.getItem('token')) {
  asyncRoute(localStorage.getItem('token'))
}

const app = createApp(App)

app.component('sideMain', sideMain)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
