<template>
  <v-card flat>
    <v-list>
      <v-list-item :prepend-avatar="data.userData.cover" :title="data.userData.name"> </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <v-btn prepend-icon="mdi-post-outline" flat>文章： {{ data.userData.post }}</v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <v-btn prepend-icon="mdi-label" flat>标签： {{ data.userData.tags }}</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { userRoot } from '@/http/root'
const data = reactive({ drawer: false, userData: {} })

function onAbort() {
  data.drawer = !data.drawer
}
function go(url) {
  window.open(url)
}

onBeforeMount(() => {
  userRoot().then((res) => {
    data.userData = res.data
  })
})
</script>
