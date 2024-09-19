<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>
          <span class="text-h5">找回密码</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-stepper>
        <v-stepper-header :model-value="tab">
          <v-stepper-item title="账号信息" value="1" complete></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item title="验证" value="2"></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item title="设置密码" value="3"></v-stepper-item>
        </v-stepper-header>

        <v-stepper-window :model-value="tab">
          <v-stepper-window-item value="1">
            <label>
              <v-text-field
                v-model="data.userInfo"
                density="compact"
                prepend-inner-icon="mdi-account"
                label="账号/邮箱"
                variant="outlined"
                :rules="[rules.nameRequired]"
                :messages="messages.userInfo"
              ></v-text-field>
            </label>
            <label>
              <v-btn block flat color="blue" @click="handlerEmail">验证并发送验证码</v-btn>
            </label>
          </v-stepper-window-item>
          <v-stepper-window-item value="2">
            <label>
              <v-text-field
                v-model="data.email"
                density="compact"
                prepend-inner-icon=""
                append-icon="mdi-send"
                label="验证码"
                variant="outlined"
                :rules="[rules.email]"
                :messages="messages.userInfo"
              ></v-text-field>
            </label>
            <label>
              <v-btn block flat color="blue" @click="handlerVerify">确 认</v-btn>
            </label>
          </v-stepper-window-item>
          <v-stepper-window-item value="3">
            <label>
              <v-text-field
                v-model="data.userpassword1"
                type="password"
                label="密码"
                variant="outlined"
                prepend-inner-icon="mdi-shield-key"
                density="compact"
                required
                :rules="[rules.passwordRequired]"
              ></v-text-field>
            </label>

            <label>
              <v-text-field
                v-model="data.userpassword2"
                type="password"
                label="确认密码"
                variant="outlined"
                prepend-inner-icon="mdi-shield-key"
                density="compact"
                required
                :rules="[rules.passwordRequired]"
              ></v-text-field>
            </label>
            <label>
              <v-btn block flat color="blue">重置密码</v-btn>
            </label>
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { userInfo } from '../../store/userStore'

const user = userInfo()

const tab = ref('1')
const messages = ref({
  userInfo: '',
  userpassword1: '',
  userpassword1: '',
})
const data = reactive({
  userInfo: '',
  userpassword1: '',
  userpassword2: '',
})
const rules = ref({
  nameRequired: (value) => !!value || '该项不能为空',
  passwordRequired: (value) => !!value || '密码不能为空',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '不能为空'
  },
})

const handlerEmail = () => {
  // 验证用户名或者邮箱并向邮箱发送重置密码的验证码
  if (!data.userInfo) {
    messages.userInfo = '该项不能为空'
    return
  }
  user.verifyInfo({ email: data.userInfo }).then((res) => {
    if (res.status == 200) {
      messages.value.userInfo = res.msg
      setTimeout(() => {
        tab.value = '2'
      }, 500)
    }
  })
}

const handlerVerify = () => {
  tab.value = '3'
  // 确认重置密码
}
</script>

<style lang="scss" scoped>
label {
  display: block;
  width: 300px;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 12px;
    color: #cfcfcf;
    text-transform: uppercase;
  }
}
</style>
