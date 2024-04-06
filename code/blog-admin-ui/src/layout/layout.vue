<template>
  <div>
    <v-navigation-drawer expand-on-hover :rail="data.show">
      <div class="d-flex justify-center align-center pa-2">
        <user></user>
      </div>
      <v-divider></v-divider>
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
