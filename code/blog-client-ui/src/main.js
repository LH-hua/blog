import { createApp } from 'vue'
import pinia from './store'
// import './style.css'
import App from './App.vue'

import 'vuetify/styles'
import router from './router/index.js'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

// 自定义样式
import '@/style/global.css'

// 布局组件
import sideMain from '@/layout/sideMain.vue'

// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// window.CESIUM_BASE_URL = 'path/to/cesium/'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})
import { asyncRoute } from '@/router/dynamicRoute'

// onMounted(() => {
if (localStorage.getItem('token')) {
  asyncRoute(localStorage.getItem('token'))
}
// })

const app = createApp(App)

app.component('sideMain', sideMain)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
