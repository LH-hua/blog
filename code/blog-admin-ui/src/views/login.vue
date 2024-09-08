<template>
  <div class="container">
    <v-sheet class="bg" width="400px">
      <v-card height="100%" class="pa-2" flat>
        <v-card-title>
          <h2>欢迎登录</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="state.form.name"
              :error-messages="state.tip.name"
              label="用户名"
              flat
              single-line
              append-inner-icon="mdi-account"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <v-text-field
              v-model="state.form.password"
              label="密码"
              single-line
              type="password"
              :error-messages="state.tip.password"
              append-inner-icon="mdi-lock"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <br />

            <v-btn block color="#00B0FF" size="large" type="submit" variant="elevated" @click="btn_login"> 登 录 </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/http/user'
import { usrMassegeStore } from '../store/massege'
import { useMenuItems } from '../store/index'
import {menu} from '@/config/menu'

const menuItems = useMenuItems()

const state = reactive({
  form: {
    name: '',
    password: '',
  },
  tip:{
    name:'',
    password:''
  }
})
const { ctx, proxy } = getCurrentInstance()
const router = useRouter()
const btn_login = () => {
  const msg = usrMassegeStore()
  if (!state.form.name) {
    // msg.openMsg({
    //   type: 'info',
    //   text: '请检查用户或密码是否完整',
    // })
    state.tip.name = '用户名不能为空'
    return
  }
  if (!state.form.password || !state.form.name) {
    // msg.openMsg({
    //   type: 'info',
    //   text: '请检查用户或密码是否完整',
    // })
    state.tip.password = '密码不能为空'
    return
  }

  login(state.form).then((res) => {
    if (res.data.token) {
      menuItems.setMenuItems()
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user-info', JSON.stringify(res.data))
      router.push({
        path: '/admin/list',
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
  background: #f5f5f5;

}
.bg{
  backdrop-filter: blur(5px);
  background-color: white
}
.v-card{
}
</style>
