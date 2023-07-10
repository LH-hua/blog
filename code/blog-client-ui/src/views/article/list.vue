<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet rounded="lg">
          <card-image></card-image>
        </v-sheet>
        <br />
        <v-sheet>
          <v-card flat>
            <v-card-title
              ><v-icon icon="mdi-bullhorn"></v-icon>公告</v-card-title
            >
            <v-card-text>
              <p>这是LH个人博客，记录和分享日常</p>
              <p>有问题欢迎讨论交流</p>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="9">
        <v-sheet class="pa-5" min-height="70vh" rounded="lg">
          <v-card
            v-for="item in data.data"
            :key="item._id"
            :title="item.title"
            :subtitle="item.date"
            :text="item.descr"
            @click="onDetal(item)"
            flat
          ></v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { getArticleList } from "@/http/article";

import cardImage from "@/components/cardImage.vue";

const router = useRouter();
const data = reactive({
  data: [],
});

function onDetal(obj) {
  router.push("detal/" + obj._id);
}

onBeforeMount(() => {
  getArticleList().then((res) => {
    data.data = res.data;
  });
});
</script>

<style scoped>
@media (min-width: 1920px){
  .v-container {
    max-width: 1200px !important;
}
}

</style>
