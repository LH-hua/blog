<template>
  <layout>
    <template #header>
      <v-spacer></v-spacer>
      <user></user>
    </template>
    <template #side>
      <v-card class="mx-auto" flat>
        <div class="pa-5 text-h5">lhgo时光印记</div>
        <v-treeview
          color="warning"
          density="compact"
          item-title="text"
          item-value="path"
          activatable
          @click:open="open"
          @update:activated="activated"
          @click:select="select"
          :items="menu"
        ></v-treeview>
      </v-card>
    </template>
    <template #main>
      <v-sheet class="pa-2 ma-5 bg" height="96%">
        <router-view></router-view>
      </v-sheet>
    </template>
  </layout>
</template>

<script setup>
import layout from './layout.vue'
import user from '@/components/user'
import { useRouter } from 'vue-router'

import { menu } from '@/config/menu.js'

const router = useRouter()

const activated = (item) => {
  router.push('/' + item)
}
</script>

<style scoped>
.bg {
  /* background-color: transparent; */
  backdrop-filter: blur(10px);
}
</style>
