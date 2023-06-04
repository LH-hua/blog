<template>
  <div>
    <v-card
      :title="data.data.title"
      :subtitle="data.data.date"
      :text="data.data.body"
      flat
    ></v-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { getArticleDetal } from '@/http/article';

const data = reactive({data:{}})

const route = useRoute()

onMounted(() => {
    const postId = route.params.id
    getArticleDetal({_id:postId}).then(res => {
        data.data = res
    })
})
</script>
