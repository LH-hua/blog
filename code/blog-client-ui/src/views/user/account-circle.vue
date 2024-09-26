<template>
  <div>
    <v-sheet>
      <v-toolbar color="white" density="compact" title="我的头像"></v-toolbar>
      <v-divider></v-divider>

      <div class="pa-5" style="display: flex; flex-direction: column; /* justify-content: center; */ align-items: center">
        <v-avatar size="100" class="user-avatar">
          <v-img :alt="user.user.username" :src="avatar || user.user.avatar"></v-img>
        </v-avatar>
        <br />
        <v-file-input
          style="display: none"
          id="avatar"
          v-model="accountFile"
          density="compact"
          variant="outlined"
          prepend-icon="mdi-account-circle"
        ></v-file-input>
        <label
          style="
            border: 1px solid #eeeeee;
            width: 100%;
            height: 150px;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
          "
          for="avatar"
        >
          <v-icon size="100" color="blue" icon="mdi-cloud-upload-outline"></v-icon>
        </label>
        <v-btn variant="tonal" color="primary" @click="save" block style="margin-top: 10px"> 保 存 </v-btn>
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
  form.append('id', user.user._id)
  form.append('avatar', accountFile.value)
  user.userAvatarUpload(form).then((res) => {
    // user.user.avatar = res.data.src
    console.log(res)
  })
}
</script>
