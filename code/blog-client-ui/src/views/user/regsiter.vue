<template>
  <div class="container">
    <v-container>
      <v-sheet :height="200" :width="200">
        <v-text-field density="compact" prepend-inner-icon="mdi-account" label="用户名" variant="outlined"></v-text-field>
        <v-text-field density="compact" prepend-inner-icon="mdi-account" label="邮箱" variant="outlined"></v-text-field>
        <v-text-field density="compact" prepend-inner-icon="mdi-account" label="验证" variant="outlined"></v-text-field>
        <v-text-field
          v-model="data.userPassword"
          type="password"
          label="密码"
          variant="outlined"
          prepend-inner-icon="mdi-shield-key"
          density="compact"
          required
          :rules="[rules.passwordRequired]"
        ></v-text-field>
        <v-btn block variant="tonal" color="primary" text="登 录" @click="handleLogin"></v-btn>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const data = reactive({
  msg: '',
  userName: '',
  userPassword: '',
})
const rules = ref({
  nameRequired: (value) => !!value || '用户名不能为空',
  passwordRequired: (value) => !!value || '密码不能为空',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
})
</script>

<style scoped></style>
