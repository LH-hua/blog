import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VSnackbarQueue } from 'vuetify/labs/VSnackbarQueue'

export const vuetify = createVuetify({
  components: {
    VSnackbarQueue,
    ...components,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {},
  },
  defaults: {
    VMain: {
      style: '--v-layout-top: 0;',
    },
  },
})
