<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2" class="">
          <div style="position: fixed;">
            <card-image></card-image>
            <br />
            <v-card flat>
              <v-card-title
                ><v-icon icon="mdi-bullhorn"></v-icon>公告</v-card-title
              >
              <v-card-text>
                <p>这是LH个人博客，记录和分享日常</p>
                <p>有问题欢迎讨论交流</p>
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import cardImage from "@/components/cardImage.vue";

import { onMounted } from "vue";
onMounted(() => {});
</script>
