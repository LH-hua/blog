<template>
  <div>
    <!-- <v-sheet> -->
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar
          v-bind="props"
          class="me-10 ms-4"
          style="cursor: pointer;"
          size="40"
          :src="store.user.avatar || '/avatar/default.jpg'"
        >
          <v-img :src="store.user.avatar || '/avatar/default.jpg'"></v-img>
        </v-avatar>
      </template>
      <v-card>
        <v-card-title>
          <span>LH-hua</span>
        </v-card-title>
        <v-card-text>
          <v-btn flat block>个人信息</v-btn>
          <v-btn flat block>记录一下</v-btn>
        </v-card-text>
        
        <v-card-actions>
            <v-divider></v-divider>
          <v-btn block>退 出</v-btn>
        </v-card-actions>
        <!-- <v-list>
          <v-list-item>
            <v-list-item-title>记录一下</v-list-item-title>
            <v-divider></v-divider>
            <v-list-item-title>退 出</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-card>
    </v-menu>
    <!-- </v-sheet> -->
  </div>
</template>

<script setup>
import { reactive } from "vue";

const store = reactive({ user: JSON.parse(localStorage.getItem("user")) });
</script>
