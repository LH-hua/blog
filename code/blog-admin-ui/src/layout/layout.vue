<template>
  <div>
    <v-app-bar  color="light-blue"  flat>
      <slot name="header"></slot>
    </v-app-bar>
    <v-navigation-drawer color="light-blue" expand-on-hover :rail="data.show">
      <slot name="side"></slot>
    </v-navigation-drawer>
    <v-main>
      <v-container class="h-100">
        <slot name="main"></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import user from '@/components/user'

const data = reactive({
  show: false,
})
function side() {
  data.show = !data.show
}
</script>
