<template>
  <div>
    <v-sheet width="800" class="pa-8 text-white mx-auto">
      <v-row dense no-gutters>
        <v-col>
          <v-img
            src="/image/default.jpg"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="390px"
            cover
          >
          </v-img>
        </v-col>
        <v-col>
          <v-card flat height="100%">
            <template v-slot:title>密码登录</template>
            <template v-slot:text>
              <v-text-field
                v-model="data.userName"
                variant="outlined"
                label="用户名"
                prepend-inner-icon="mdi-account"
                compact
                required
              ></v-text-field>
              <v-text-field
                v-model="data.userPassword"
                label="密码"
                :type="data.textType"
                variant="outlined"
                prepend-inner-icon="mdi-shield-key"
                :append-inner-icon="data.onVisible"
                @click:appendInner="onVisible"
                compact
                required
              ></v-text-field>
            </template>
            <template v-slot:actions>
              <v-btn height="40" class="flex-grow-1" variant="outlined" density>
                注 册
              </v-btn>

              <v-btn
                class="flex-grow-1 text-none text-subtitle-1"
                color="#2196F3"
                variant="flat"
                height="40"
                @click="onLogin"
                density
              >
                登 录
              </v-btn>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script setup>
import { reactive } from "vue";

import { useLogin } from "@/http/user";

const data = reactive({
  userName: "",
  userPassword: "",
  onVisible: "mdi-eye-off",
  textType: "password",
});

function onLogin() {
  useLogin({
    username: data.userName,
    password: data.userPassword,
  }).then((res) => {
    console.log(res);
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('user',JSON.stringify(res.data.data))
  });
}

function onVisible() {
  if (data.onVisible !== "mdi-eye-off") {
    data.onVisible = "mdi-eye-off";
    data.textType = "password";
  } else {
    (data.onVisible = "mdi-eye"), (data.textType = "text");
  }
}
</script>
