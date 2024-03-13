// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import layout from './layout/TwoCol.vue'

const myCustomLightTheme = {
    colors: {
        background: '#eeeeee',
    }
}

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
    icons: {
        defaultSet: 'mdi',
    },
})
app.component('layout', layout)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
