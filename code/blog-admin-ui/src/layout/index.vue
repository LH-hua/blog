<template>
  <layout>
    <template #header>

      <v-spacer></v-spacer>
      <user></user>
    </template>
    <template #side>
      <v-card class="mx-auto" flat color="transparent">
        <div class="pa-2">
          <h2>LHGO</h2>
        </div>
        <v-list density="compact">
          <Menu :data="menu"></Menu>
        </v-list>
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
import Menu from '@/components/Menu.vue'

import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

import { menu } from '@/config/menu.js'

const { ctx, proxy } = getCurrentInstance()
const router = useRouter()
const _this = ctx

const toRouter = (val) => {
  router.push(val.path)
}
</script>

<style scoped>
.bg {
  /* background-color: transparent; */
  backdrop-filter: blur(10px);
}
</style>
