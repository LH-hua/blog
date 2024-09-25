<template>
  <div>
    <v-sheet>
      <v-toolbar density="compact" title="我的头像"></v-toolbar>
      <div class="pa-5">
        <v-avatar size="x-large" class="user-avatar">
          <v-img :alt="user.user.username" :src="avatar || user.user.avatar"></v-img>
        </v-avatar>
        <br />
        <v-file-input v-model="accountFile" density="compact" variant="outlined" prepend-icon="mdi-account-circle"></v-file-input>
        <v-btn variant="tonal" color="primary" @click="save"> 保 存 </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { userInfo } from '../../store/userStore'

const accountFile = ref()
const user = userInfo()

const avatar = computed(() => {
  if (accountFile.value) {
    return URL.createObjectURL(accountFile.value)
  }
  return
})

function save() {
  if (!accountFile.value) {
    return
  }
  const form = new FormData()
  form.append('id',user.user._id)
  form.append('avatar', accountFile.value)
  user.userAvatarUpload(form).then((res) => {
    // user.user.avatar = res.data.src
    console.log(res)
  })
}

</script>
