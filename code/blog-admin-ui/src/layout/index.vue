<template>
  <layout>
    <template #side>
      <v-card class="mx-auto" height="100%">
        <v-list density="compact">
          <!-- <v-list-subheader></v-list-subheader> -->
          <v-list-item
            v-for="(item, i) in data"
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
const data = reactive([
  {
    parent: null,
    id: 0,
    text: "文章",
    icon: "mdi-clock",
    path: "@/views/home.vue",
    chilren: [
      {
        parent: null,
        id: 0,
        text: "文章",
        icon: "mdi-clock",
        path: "@/views/home.vue",
        chilren: [],
      },
    ],
  },
  {
    parent: null,
    id: 1,
    text: "Audience",
    icon: "mdi-account",
    path: "@/views/home.vue",
    chilren: [
      {
        parent: null,
        id: 1,
        text: "Audience",
        icon: "mdi-account",
        path: "@/views/home.vue",
        chilren: [],
      },
    ],
  },
  {
    parent: null,
    id: 2,
    text: "Conversions",
    icon: "mdi-flag",
    path: "@/views/home.vue",
    chilren: [
      {
        parent: null,
        id: 2,
        text: "Conversions",
        icon: "mdi-flag",
        path: "@/views/home.vue",
        chilren: [],
      },
    ],
  },
]);
</script>