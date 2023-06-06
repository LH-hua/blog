<template>
  <v-container class="fill-height d-flex align-center">
    <v-avatar class="me-10 ms-4" color="grey-darken-1" size="40">LH</v-avatar>
    <v-spacer></v-spacer>
    <v-btn
      v-for="item in menu.data"
      :key="item.url"
      variant="text"
      @click="onTorouter(item)"
    >
      <v-icon :icon="item.icon" />
      {{ item.name }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const menu = reactive({
  data: [
    {
      id: "0",
      pid: "0",
      icon: "mdi-home",
      name: "首页",
      url: "/",
      children: [],
    },
    {
      id: "1",
      pid: "0",
      icon: "mdi-home",
      name: "室内场景",
      url: "/indoors",
      children: [],
    },
    {
      id: "2",
      pid: "0",
      icon: "mdi-home",
      name: "室外场景",
      url: "/gis",
      children: [],
    },
  ],
});

const router = useRouter();
const route = useRoute();

function onTorouter(obj) {
  console.log(route);
  console.log(obj);
  router.push(obj.url );
}
</script>
