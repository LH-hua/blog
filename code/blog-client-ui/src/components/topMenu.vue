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
    <v-dialog v-model="data.dialog" persistent width="1024">
      <!-- <v-container> -->
      <v-sheet height="400" width="800" border>
        <v-row dense no-gutters>
          <v-col cols="5">
            <v-card flat>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="390px"
                cover
              >
                <v-card-title
                  class="text-white"
                >Pre-fab homes</v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat height="100%">
              <template v-slot:title>密码登录</template>
              <template v-slot:text>
                <v-text-field
                  variant="outlined"
                  label="用户名"
                  prepend-inner-icon="mdi-account"
                  required
                ></v-text-field>
                <v-text-field
                  label="密码"
                  type="passworld"
                  variant="outlined"
                  prepend-inner-icon="mdi-shield-key"
                  append-inner-icon="mdi-eye-off"
                  required
                ></v-text-field>
              </template>
              <template v-slot:actions>
                <v-btn
                  height="48"
                  class="flex-grow-1"
                  variant="outlined"
                  size="small"
                >
                  注 册
                </v-btn>

                <v-btn
                  class="flex-grow-1 text-none text-subtitle-1"
                  color="#2196F3"
                  variant="flat"
                  height="48"
                  @click="load"
                  size="small"
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
const data = reactive({
  menu: [
    {
      id: "0",
      pid: "0",
      icon: "mdi-home",
      name: "首页",
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
      icon: "mdi-home",
      name: "室外场景",
      url: "/gis",
      children: [],
    },
  ],
  dialog: false,
});

const router = useRouter();
const route = useRoute();

function onDialogShow() {
  data.dialog = !data.dialog;
}

function onTorouter(obj) {
  console.log(route);
  console.log(obj);
  router.push(obj.url);
}
</script>
