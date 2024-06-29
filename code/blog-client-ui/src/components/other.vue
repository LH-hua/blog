<template>
  <div>
    <v-card flat>
      <v-card-title>其他</v-card-title>
      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in list" :key="item.name">
          <v-list-item-title>
            <v-btn prepend-icon="mdi-postage-stamp" flat @click="handlerClick(item)">{{ item.name }}</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { getCaptcha } from '@/http/article'

const list = ref([
  {
    name: '大事件',
    href: 'http://8.137.113.237:8002',
  },
  {
    name: '功能合集',
    href: 'http://8.134.217.110:4060',
  },
])

const handlerClick = (item) => {
  window.open(item.href)
}

// getCaptcha().then((res) => {
//   captchas.value = res.data
// })
</script>
