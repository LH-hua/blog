import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import router from './router/index'

import twoCol from '@/layout/twoCol.vue'
import twoCol1 from '@/layout/twoCol1.vue'
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia()
const app = createApp(App)
app.component('twoCol',twoCol)
app.component('twoCol1',twoCol1)
app.use(pinia)
app.use(router)
app.use(vuetify).mount('#app')
