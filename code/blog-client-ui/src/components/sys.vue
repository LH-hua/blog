<template>
  <v-sheet class="pa-5" style="margin-top: 10px">
    <div style="display: flex; justify-content: space-between">
      <v-btn color="#cde4ef" variant="flat" @click="about" prepend-icon="mdi-pencil-box" stacked> 关于 </v-btn>
      <v-btn color="#cde4ef" variant="flat" @click="rules" prepend-icon="mdi-cog" stacked> 规则 </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const about = () => {
  router.push('/posts/66f5520dec491b2b889c9f39')
}
const rules = () => {
  router.push('/posts/66f93b161862c09af020a8a6')
}
</script>
