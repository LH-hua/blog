<template>
  <v-container class="fill-height d-flex align-center">
    <v-avatar class="me-10 ms-4" color="grey-darken-1" size="40">LH</v-avatar>
    <v-spacer></v-spacer>
    <v-btn v-for="item in menu.data" :key="item" variant="text">
      {{ item.title }}
    </v-btn>
  </v-container>
</template>

<script setup>
import {reactive} from 'vue'
const menu = reactive({
  data: [
    {
      title: "首页",
      path: "",
    },
    {
      title: "室内场景",
      path: "",
    },
    {
      title: "室外场景",
      path: "",
    },
  ],
});
</script>