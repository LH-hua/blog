<template>
  <div class="d-flex flex-wrap ga-4 justify-start">
    <v-card v-for="item in data.dataList" :key="item._id" flat>
      <v-card-item>
        <v-img :src="item.cover" :width="330"> </v-img>
        <v-card-title>
          {{ item.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ item.subtitle }}
        </v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue'
import { prejectList } from '@/http/preject'

const data = reactive({
  dataList: [],
})

onBeforeMount(() => {
  prejectList().then((res) => {
    data.dataList = res.data.data
  })
})
</script>
