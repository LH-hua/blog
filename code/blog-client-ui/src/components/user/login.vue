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
              <div
                style="
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: end;
                "
              >
                <a
                  href=""
                  class="text-caption text-decoration-none text-blue"
                  rel="noopener noreferrer"
                  >忘记密码？</a
                >
              </div>
              <v-btn
                class="flex-grow-1 text-none text-subtitle-1"
                color="#2196F3"
                variant="flat"
                height="40"
                @click="onLogin"
                block
                density
              >
                登 录
              </v-btn>
              <div
                style="
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
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
import { reactive, defineEmits, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useLogin } from "@/http/user";
import gz from "@/assets/json/gz.json";

import * as echarts from "echarts";

const route = useRoute();
const router = useRouter();

const data = reactive({
  msg: "",
  userName: "",
  userPassword: "",
  onVisible: "mdi-eye-off",
  textType: "password",
});

const useNameRules = computed(() => {
  if (!data.msg) return true;
  return data.msg;
});
const usePasswordRules = computed(() => {
  if (!data.msg) return true;
  return data.msg;
});

const emit = defineEmits({
  close: (Boolean) => {
    return Boolean;
  },
});

onMounted(() => {
  initChart();
});

function onLogin() {
  const routes = [
    { path: "/", redirect: "/post/list" },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home.vue"),
      children: [
        {
          path: "post",
          name: "test",
          component: () => import("@/views/article/index.vue"),
          children: [
            {
              path: "list",
              name: "列表",
              component: () => import("@/views/article/list.vue"),
            },
            {
              path: "detal/:id",
              name: "详情",
              component: () => import("@/views/article/detal.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/gis",
      name: "gis",
      component: () => import("@/views/gis/index.vue"),
    },
    {
      path: "/indoors",
      name: "indoors",
      component: () => import("@/views/indoors/index.vue"),
    },
    {
      path: "/add",
      name: "写文章",
      component: () => import("@/views/article/edit.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
  ];
  routes.forEach(item => {
    router.addRoute(item);
  })
  
  useLogin({
    username: data.userName,
    password: data.userPassword,
  }).then((res) => {
    if (res.data.status == 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      emit("close", true);
      location.reload();
    } else {
      data.msg = res.data.msg;
    }
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

function initChart() {
  const chartDom = document.querySelector("#chart");
  const myChart = echarts.init(chartDom);
  echarts.registerMap("gz", gz);
  const option = {
    series: [
      {
        name: "gz",
        type: "map",
        map: "gz",
      },
    ],
  };
  myChart.setOption(option);
}
</script>
