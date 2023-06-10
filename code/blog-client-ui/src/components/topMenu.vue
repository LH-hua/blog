<template>
  <v-container class="fill-height d-flex align-center">
    <v-avatar class="me-10 ms-4" color="grey-darken-1" size="40">LH</v-avatar>
    <v-spacer></v-spacer>
    <v-btn
      v-for="item in data.menu"
      :key="item.url"
      variant="text"
      @click="onTorouter(item)"
    >
      <v-icon :icon="item.icon" />
      {{ item.name }}
    </v-btn>
    <v-avatar
      style="cursor: pointer"
      class="me-10 ms-4"
      color="grey-darken-1"
      size="45"
      @click="onDialogShow"
      >登 录</v-avatar
    >
    <v-dialog v-model="data.dialog" width="1024">
      <login v-if="data.login"></login>
      <!-- <regsite v-else></regsite> -->
    </v-dialog>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
// components
import login from "@/components/user/login.vue";
// import regsite from "@/components/user/regsite.vue";
const data = reactive({
  menu: [
    {
      id: "0",
      pid: "0",
      icon: "mdi-clipboard-list-outline",
      name: "文 章",
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
      icon: "mdi-earth",
      name: "室外场景",
      url: "/gis",
      children: [],
    },
  ],
  login:true,
  dialog: false,
});

const router = useRouter();
const route = useRoute();


function onDialogShow() {
  data.dialog = !data.dialog;
}



function onTorouter(obj) {
  console.log(route);
  console.log(obj);
  router.push(obj.url);
}
</script>
