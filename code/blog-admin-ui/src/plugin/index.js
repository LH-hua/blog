import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { VTreeview } from 'vuetify/labs/VTreeview'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import '@mdi/font/css/materialdesignicons.css'

export const vuetify = createVuetify({
  components: {
    ...components,
    VTreeview,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})
