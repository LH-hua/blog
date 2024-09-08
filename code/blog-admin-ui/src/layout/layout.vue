<template>
  <!-- <div> -->
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <slot name="side"></slot>
    </v-navigation-drawer>

    <v-app-bar flat>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <slot name="header"></slot>
    </v-app-bar>

    <v-main style="background-color: #f5f5f5">
      <v-container class="h-100">
        <slot name="main"></slot>
      </v-container>
    </v-main>
  </v-layout>

  <!-- </div> -->
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
