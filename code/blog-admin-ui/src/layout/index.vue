<template>
  <layout>
    <template #side>
      <v-card class="mx-auto" height="100%">
        <v-list density="compact">
          <!-- <v-list-subheader></v-list-subheader> -->
          <v-list-item
            v-for="(item, i) in menu"
            :key="i"
            :value="item"
            active-color="primary"
            @click="router(item)"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
    <template #main>
      <v-card>
        <v-card-text>
            <router-view></router-view>
        </v-card-text>
      </v-card>
    </template>
  </layout>
</template>

<script setup>
import layout from "./layout.vue";
import { reactive } from "vue";
import {menu} from '@/config/menu.js'
</script>