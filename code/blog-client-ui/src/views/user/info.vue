<template>
  <div>
    <v-sheet>
      <v-toolbar color="white" density="compact" title="我的信息"></v-toolbar>
      <v-divider></v-divider>

      <div class="pa-5">
        <v-text-field density="compact" variant="outlined" v-model="userObj.username">
          <template #prepend>
            <span>昵称:</span>
          </template>
        </v-text-field>
        <v-text-field density="compact" variant="outlined" disabled v-model="userObj._id">
          <template #prepend>
            <span>u_id:</span>
          </template>
        </v-text-field>
        <v-textarea variant="outlined" rows="2" v-model="userObj.text">
          <template #prepend>
            <span>签名:</span>
          </template>
        </v-textarea>
        <v-radio-group inline v-model="userObj.sex">
          <v-radio label="男" value="M" color="primary"></v-radio>
          <v-radio label="女" value="F" color="red"></v-radio>
          <v-radio label="保密" value="X"></v-radio>
        </v-radio-group>
        <v-btn variant="tonal" color="primary" @click="save"> 保 存 </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { userInfo } from '../../store/userStore'
import { serInfoUpdate } from '../../http/user'

const user = userInfo()
const userObj = ref({
  _id: user.user._id,
  username: user.user.username,
  text: user.user.text,
  sex: user.user.sex,
})

function save() {
  serInfoUpdate(userObj.value).then((res) => {
    console.log(res)
  })
}

onBeforeMount(() => {})
</script>
