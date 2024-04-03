<template>
  <layout>
    <template #header>
      <v-container>
        <v-row no-gutters>
          <v-col cols="11"></v-col>
          <v-col cols="1">
            <user></user>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #side>
      <v-card class="mx-auto" flat>
        <v-list density="compact">
          <div v-for="(item, index) in menu" :key="item + index">
            <v-list-group v-if="item.chilren.length > 0" :value="item.text">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.text"></v-list-item>
              </template>
              <v-list-item
                v-for="(item1, i) in item.chilren"
                :key="item1 + i"
                :value="item1.text"
                :title="item1.text"
                :prepend-icon="item1.icon"
                @click="toRouter(item)"
              ></v-list-item>
            </v-list-group>
            <v-list-item v-else :value="item.text" active-color="primary" :title="item.text" :prepend-icon="item.icon" @click="toRouter(item)">
            </v-list-item>
          </div>
        </v-list>
      </v-card>
    </template>
    <template #main>
      <v-card style="height: 89vh">
        <v-card-text>
          <router-view></router-view>
        </v-card-text>
      </v-card>
    </template>
  </layout>
</template>

<script setup>
import layout from './layout.vue'
import user from '@/components/user'

import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

import { menu } from '@/config/menu.js'

const { ctx, proxy } = getCurrentInstance()
const router = useRouter()
const _this = ctx

const toRouter = (val) => {
  console.log(_this)
  console.log(proxy)
  router.push(val.path)
}
</script>
