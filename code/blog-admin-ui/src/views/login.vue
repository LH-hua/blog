<template>
  <div class="container">
    <v-sheet width="400px" height="400px" rounded>
      <v-card height="100%" style="padding: 10px">
        <v-form>
          <h2>欢迎登录</h2>
          <v-divider></v-divider>
          <br />
          <v-text-field
            v-model="state.form.username"
            label="用户名"
            flat
            single-line
            append-inner-icon="mdi-account"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="state.form.password"
            label="密码"
            single-line
            type="password"
            append-inner-icon="mdi-lock"
            variant="outlined"
          ></v-text-field>

          <br />

          <v-btn block color="#00B0FF" size="large" type="submit" variant="elevated" @click="btn_login"> 登 录 </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/http/user'
import { usrMassegeStore } from '../store/massege'

const state = reactive({
  form: {
    username: '',
    password: '',
  },
})
const { ctx, proxy } = getCurrentInstance()
const _this = ctx
const router = useRouter()
const btn_login = () => {
  const msg = usrMassegeStore()
  if (!state.form.password || !state.form.username) {
    msg.openMsg({
      type: 'info',
      text: '请检查用户或密码是否完整',
    })
    return
  }
  login(state.form).then((res) => {
    if (res.data.token) {
      sessionStorage.setItem('token', res.data.token)
      router.push({
        path: '/admin/article',
      })
    }
    msg.openMsg({
      type: res.data.type,
      text: res.data.msg,
    })
  })
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../assets/bg.jpg');
  background-size: cover;
  //   background-attachment: fixed;
}
</style>
