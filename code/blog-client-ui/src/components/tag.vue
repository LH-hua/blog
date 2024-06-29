<template>
  <div>
    <v-card flat>
      <v-card-title>标签</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-chip class="ma-2" color="cyan" label size="small" v-for="item in captchas" :key="item.captcha" @click="handlerCaptch(item.captcha)">
          <v-icon icon="mdi-label" start></v-icon>{{ item.captcha }}
        </v-chip>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { getCaptcha } from '@/http/article'

const captchas = ref()

getCaptcha().then((res) => {
  captchas.value = res.data
})
</script>
