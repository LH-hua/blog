<template>
  <div>
    <v-sheet>
      <v-toolbar density="compact" title="我的信息"></v-toolbar>
      <div class="pa-5">
        <v-text-field density="compact" variant="outlined" v-model="user.user.username">
          <template #prepend>
            <span>昵称:</span>
          </template>
        </v-text-field>
        <v-text-field density="compact" variant="outlined" disabled  v-model="user.user._id">
          <template #prepend>
            <span>u_id:</span>
          </template>
        </v-text-field>
        <v-textarea variant="outlined" rows="2" v-model="user.user.text" >
          <template #prepend>
            <span>签名:</span>
          </template>
        </v-textarea>
        <v-radio-group inline v-model="user.user.sex">
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
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { userInfo } from '../../store/userStore';
import { getUserInfo,serInfoUpdate } from '../../http/user';

const user = userInfo()
const route = useRoute()

function save(){
  serInfoUpdate(user.user).then(res => {
    console.log(res)
  })
}

onBeforeMount(() => {
  console.log(route.params)
  getUserInfo().then(res => {
    console.log(res)
  })
})
</script>
