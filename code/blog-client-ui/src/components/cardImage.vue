<template>
  <v-sheet>
    <v-card flat>
      <v-card-title>
        <div
          style="
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
          "
        >
          <v-avatar
            image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-avatar>
          <span>LH-hua</span>
          <span>生活不止有今天的麻烦，还有明天的烦恼</span>
        </div>
      </v-card-title>
      <v-card-text>
        <!-- <div>明天会更好</div>

        <div>一个乐于分享的网站</div> -->
      </v-card-text>
      <template v-slot:actions>
        <v-btn
          class="flex-grow-1 grey-lighten-2"
          color="#EEEEEE"
          variant="flat"
          @click="toGithub"
        >
          <v-icon icon="mdi-github"></v-icon>
        </v-btn>
        <v-btn
          class="flex-grow-1 grey-lighten-2"
          color="#EEEEEE"
          variant="flat"
          @click="onAbort"
        >
          <v-icon icon="mdi-account"></v-icon>
        </v-btn>
      </template>
    </v-card>
  </v-sheet>
  <v-navigation-drawer v-model="drawer.drawer" temporary>
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        title="LH"
      ></v-list-item>
      <v-list-item> 明天和意外谁会先来临呢？ </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-email" title="huaker_hk@163.com"></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-qqchat" title="1589715612"></v-list-item>
      <v-divider></v-divider>
    </v-list>
    
  </v-navigation-drawer>
</template>

<script setup>
import { reactive } from "vue";
const drawer = reactive({ drawer: false });

function onAbort() {
  drawer.drawer = !drawer.drawer;
}
function toGithub() {
  window.open("https://github.com/LH-hua");
}
</script>
