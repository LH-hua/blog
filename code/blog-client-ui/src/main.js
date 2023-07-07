import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import 'vuetify/styles'
import router from './router/index.js'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

// 自定义样式
import '@/style/global.css'

// import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// window.CESIUM_BASE_URL = 'path/to/cesium/'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  }
})

createApp(App).use(router).use(vuetify).mount('#app')
