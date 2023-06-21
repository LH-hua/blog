<template>
  <v-sheet class="pa-5" min-height="70vh" rounded="lg">
    <v-card v-for="item in data.data" :key="item._id" :title="item.title" :subtitle="item.date" :text="item.descr"
      @click="onDetal(item)" flat></v-card>
  </v-sheet>
</template>

<script setup>
import { reactive, onBeforeMount } from "vue"
import { useRouter } from "vue-router"

import { getArticleList } from "@/http/article"
const router = useRouter()
const data = reactive({
  data: [],
});

function onDetal(obj) {
  router.push('detal/' + obj._id)
}
onBeforeMount(() => {
  getArticleList().then((res) => {
    data.data = res.data;
  });
});
</script>
