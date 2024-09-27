<template>
  <div>
    <v-sheet>
      <v-toolbar color="white" density="compact" title="我的邮箱"></v-toolbar>
      <v-divider></v-divider>
      <v-alert v-model="alert" density="compact" :text="text" title="提示" :type="type" closable></v-alert>

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
const alert = ref(false)
const text = ref('')
const type = ref('success')
const user = userInfo()
const tmp = ref()

const handlerEmail = async () => {
  user.emailVerify({ email: newForm.value.email }).then((res) => {
    email.value.msg = res.msg
  })
}

const save = () => {
  if (!newForm.email || !newForm.code) {
    return
  }
  user.userUpdateEmail(newForm.value).then((res) => {
    if (res.data.status == 200) {
      text.value = res.data.msg
      alert.value = true
    } else {
      type.value = 'warning'
      text.value = res.data.msg
      alert.value = true
    }
    tmp.value = null
    tmp.value = setTimeout(function () {
      alert.value = false
    }, 2000)
  })
}
</script>
