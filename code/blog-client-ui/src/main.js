import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import router from './router/index.js'
import { vuetify } from './plugin'

// 自定义样式
import '@/style/global.css'

// 布局组件
import sideMain from '@/layout/sideMain.vue'

// import { asyncRoute } from '@/router/dynamicRoute'
// if (localStorage.getItem('token')) {
//   asyncRoute(localStorage.getItem('token'))
// }

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component('sideMain', sideMain)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
