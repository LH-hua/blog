<template>
  <div>
    <v-sheet>
      <v-toolbar density="compact" title="我的邮箱"></v-toolbar>
      <div class="pa-5">
        <v-text-field density="compact" variant="outlined" disabled v-model="user.user.email">
          <template #prepend>
            <span>旧邮箱:</span>
          </template>
        </v-text-field>
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="newForm.email"
          append-icon="mdi-send"
          :rules="[rules.email]"
          @click:append="handlerEmail"
        >
          <template #prepend>
            <span>新邮箱:</span>
          </template>
        </v-text-field>
        <v-text-field density="compact" variant="outlined" v-model="newForm.code">
          <template #prepend>
            <span>验证码:</span>
          </template>
        </v-text-field>
        <v-btn variant="tonal" color="primary" @click="save"> 保 存 </v-btn>
      </div>
    </v-sheet>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { userInfo } from '../../store/userStore'
import { rules } from '../../utils/tool'

const newForm = ref({
  email: '',
  code: '',
})
const user = userInfo()

const handlerEmail = async () => {
  user.emailVerify({ email: regsiterForm.email }).then((res) => {
    email.value.msg = res.msg
  })
}
</script>
