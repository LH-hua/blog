<template>
  <div>
    <v-sheet width="800" class="pa-8 text-white mx-auto">
      <v-row dense no-gutters>
        <v-col>
          <div id="chart" style="height: 390px"></div>
        </v-col>
        <v-col>
          <v-card flat height="100%">
            <!-- <template v-slot:title>登录</template> -->
            <template v-slot:text>
              <div class="text-subtitle-1 text-medium-emphasis">用户</div>
              <v-text-field
                v-model="data.userName"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                density="compact"
                required
                :rules="[useNameRules]"
              ></v-text-field>
              <div class="text-subtitle-1 text-medium-emphasis">密码</div>
              <v-text-field
                v-model="data.userPassword"
                :type="data.textType"
                variant="outlined"
                prepend-inner-icon="mdi-shield-key"
                :append-inner-icon="data.onVisible"
                @click:appendInner="onVisible"
                density="compact"
                required
                :rules="[usePasswordRules]"
              ></v-text-field>
              <div style="height: 40px; display: flex; align-items: center; justify-content: end">
                <a href="" class="text-caption text-decoration-none text-blue" rel="noopener noreferrer">忘记密码？</a>
              </div>
              <v-btn class="flex-grow-1 text-none text-subtitle-1" color="#2196F3" variant="flat" height="40" @click="onLogin" block density>
                登 录
              </v-btn>
              <div style="height: 40px; display: flex; align-items: center; justify-content: center">
                <a href="" class="text-blue">没有账号？点击我注册一个</a>
              </div>
            </template>
            <template v-slot:actions> </template>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script setup>
import { reactive, defineEmits, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useLogin } from '@/http/user'
import gz from '@/assets/json/gz.json'

import * as echarts from 'echarts'

// pinia

import { userInfo } from '@/store/userStore'

const route = useRoute()
const router = useRouter()
const user = userInfo()

const data = reactive({
  msg: '',
  userName: '',
  userPassword: '',
  onVisible: 'mdi-eye-off',
  textType: 'password',
})

const useNameRules = computed(() => {
  if (!data.msg) return true
  return data.msg
})
const usePasswordRules = computed(() => {
  if (!data.msg) return true
  return data.msg
})

const emit = defineEmits({
  close: (Boolean) => {
    return Boolean
  },
})

onMounted(() => {
  initChart()
})

function onLogin() {
  const res = user.useLogin({
    username: data.userName,
    password: data.userPassword,
  })
  emit('close', res.satus)
}

function onVisible() {
  if (data.onVisible !== 'mdi-eye-off') {
    data.onVisible = 'mdi-eye-off'
    data.textType = 'password'
  } else {
    ;(data.onVisible = 'mdi-eye'), (data.textType = 'text')
  }
}

function initChart() {
  const chartDom = document.querySelector('#chart')
  const myChart = echarts.init(chartDom)
  echarts.registerMap('gz', gz)
  const option = {
    series: [
      {
        name: 'gz',
        type: 'map',
        map: 'gz',
      },
    ],
  }
  myChart.setOption(option)
}
</script>
