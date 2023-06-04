<template>
  <v-sheet min-height="70vh" rounded="lg">
    <v-card
      v-for="(item, index) in data.data"
      :key="item._id"
      :title="item.title"
      :subtitle="item.date"
      :text="item.descr"
      flat
    ></v-card>
  </v-sheet>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { getArticleList } from "@/http/article";
const data = reactive({
  data: [],
});
onMounted(() => {
  getArticleList().then((res) => {
    data.data = res.msg;
  });
});
</script>
