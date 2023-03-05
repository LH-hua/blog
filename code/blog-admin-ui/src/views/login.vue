<template>
  <div class="container">
    <!-- <v-card>
      <v-card-text> -->
    <v-sheet rounded width="400px">
      <v-card border="1">
        <v-card-title>攒雷塔后台</v-card-title>
        <v-card-subtitle>
          <v-divider></v-divider>
        </v-card-subtitle>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="state.form.username"
              :rules="nameRules"
              label="用户"
              required
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="state.form.password"
              :rules="nameRules"
              label="密码"
              required
              density="compact"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div style="display:felx;align-items: center;justify-content: end;">
            <v-btn color="#00B0FF" variant="flat" @click="btn_login">登 录</v-btn>
            <v-btn color="#00B0FF" variant="flat">重 置</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-sheet>
    <!-- </v-card-text>
    </v-card> -->
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {login} from '@/http/user'

const state = reactive({
  form: {
    username: "",
    password: "",
  },
});
const router = useRouter();
const btn_login = () => {
  login(state.form).then(res => {
    if(res.data.token){
      sessionStorage.setItem('token',res.data.token)
      router.push({
        path:'/admin/article'
      })
    }
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
  background: url("../assets/bg.jpg");
  background-size: cover;
//   background-attachment: fixed;
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>