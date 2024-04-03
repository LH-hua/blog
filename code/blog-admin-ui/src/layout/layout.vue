<template>
  <div style="background-color: #eff3f6">
    <v-navigation-drawer expand-on-hover :rail="data.show">
      <div class="pa-2">
        <div class="title font-weight-bold text-uppercase text-primary">L H</div>
        <div class="overline text-grey">1.0.0</div>
      </div>
      <slot name="side"></slot>
    </v-navigation-drawer>
    <v-app-bar title="">
      <v-btn @click="side">
        <v-icon>{{ data.show ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left' }}</v-icon>
      </v-btn>
      <slot name="header"></slot>
    </v-app-bar>

    <v-main>
      <v-container class="h-100">
        <slot name="main"></slot>
      </v-container>
    </v-main>
    <v-footer app>
      <div class="overline">
        <v-icon small color="pink">mdi-github</v-icon>
        <a class="text-decoration-none" href="https://github.com/" target="_blank">LH</a>
      </div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const data = reactive({
  show: false,
})
function side() {
  data.show = !data.show
}
</script>
