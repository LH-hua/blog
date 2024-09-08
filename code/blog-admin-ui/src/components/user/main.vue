<template>
  <div>
    <v-btn icon v-bind="props">
      <v-avatar color="brown">
        <v-img alt="Avatar" :src="data.user.avatar"></v-img>
      </v-avatar>
    </v-btn>
    <v-divider vertical></v-divider>
    <v-btn @click="loginOut"> 退出 </v-btn>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({
  user: {},
})

const loginOut = () => {
  localStorage.clear()
  router.push({ path: 'login' })
}
onBeforeMount(() => {
  // data.user = JSON.parse(localStorage.getItem('user-info'))
})
</script>
