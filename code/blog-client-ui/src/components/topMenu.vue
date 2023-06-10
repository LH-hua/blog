<template>
  <v-container class="fill-height d-flex align-center">
    <v-avatar class="me-10 ms-4" color="grey-darken-1" size="40">LH</v-avatar>
    <v-spacer></v-spacer>
    <v-btn
      v-for="item in data.menu"
      :key="item.url"
      variant="text"
      @click="onTorouter(item)"
    >
      <v-icon :icon="item.icon" />
      {{ item.name }}
    </v-btn>
    <v-avatar
      style="cursor: pointer"
      class="me-10 ms-4"
      color="grey-darken-1"
      size="45"
      @click="onDialogShow"
      >登 录</v-avatar
    >
    <v-dialog v-model="data.dialog" width="1024">
      <!-- <v-container> -->
      <v-sheet width="800" class="pa-8 text-white mx-auto">
        <v-row dense no-gutters>
          <v-col>
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="390px"
              cover
              >Pre-fab homes
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
                <v-btn
                  height="40"
                  class="flex-grow-1"
                  variant="outlined"
                  density
                >
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

      <!-- </v-container> -->
    </v-dialog>
  </v-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "@/http/user";
const data = reactive({
  menu: [
    {
      id: "0",
      pid: "0",
      icon: "mdi-clipboard-list-outline",
      name: "文 章",
      url: "/",
      children: [],
    },
    {
      id: "1",
      pid: "0",
      icon: "mdi-home",
      name: "室内场景",
      url: "/indoors",
      children: [],
    },
    {
      id: "2",
      pid: "0",
      icon: "mdi-earth",
      name: "室外场景",
      url: "/gis",
      children: [],
    },
  ],
  dialog: false,
  onVisible: "mdi-eye-off",
  textType: "password",
  userName: "",
  userPassword: "",
});

const router = useRouter();
const route = useRoute();

function onLogin() {
  login({
    username: data.userName,
    password: data.userPassword,
  }).then(res => {
    console.log(res)
  })
}

function onDialogShow() {
  data.dialog = !data.dialog;
}

function onVisible() {
  if (data.onVisible !== "mdi-eye-off") {
    data.onVisible = "mdi-eye-off";
    data.textType = "password";
  } else {
    (data.onVisible = "mdi-eye"), (data.textType = "text");
  }
}

function onTorouter(obj) {
  console.log(route);
  console.log(obj);
  router.push(obj.url);
}
</script>
