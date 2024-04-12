<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="large">
          <v-img alt="Avatar" :src="data.user.avatar"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card color="transparent">
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <v-img alt="Avatar" :src="data.user.avatar"></v-img>
          </v-avatar>
          <h3>{{ data.user.username }}</h3>
          <p class="text-caption mt-1">
            {{ data.user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <!-- <v-btn variant="text" rounded> Edit Account </v-btn> -->
          <!-- <v-divider class="my-3"></v-divider> -->
          <v-btn variant="text" rounded @click="loginOut"> 退出 </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
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
  data.user = JSON.parse(localStorage.getItem('user-info'))
})
</script>
