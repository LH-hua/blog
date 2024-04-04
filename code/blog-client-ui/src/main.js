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

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#eeee',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
  defaults: {
    VSheet: {
      style: 'background: transparent',
    },
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
