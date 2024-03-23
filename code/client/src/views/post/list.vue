<template>
  <layout>
    <template #main>
      <br />
      <v-sheet :rounded="'lg'">
        <div class="d-flex flex-no-wrap" v-for="item in data.data" :key="item._id" @click="onDetal(item)">
          <v-avatar class="ma-3" rounded="0" size="150">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
              </v-avatar>
          <v-card
                flat
                :key="item._id"
                :title="item.title"
                :subtitle="item.date"
                :text="item.descr"
              >
              </v-card>
        </div>
      </v-sheet>
    </template>
    <template #side>
      <br />
      <v-sheet :rounded="'lg'">
        <v-card flat>
          <v-card-title>
            <div
              style="
                width: 100%;
                height: 150px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 14px;
              "
            >
              <v-avatar image="/avatar/default.jpg"></v-avatar>
              <span>LH-hua</span>
              <span>虽千万人，吾往矣。</span>
              <div>还没想好</div>
            </div>
          </v-card-title>
          <v-card-text> </v-card-text>
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
      <br />
      <v-sheet :rounded="'lg'">
        <v-card flat>
          <v-card-title><v-icon icon="mdi-bullhorn"></v-icon>公告</v-card-title>
          <v-card-text>
            <p>这是LH个人博客，记录和分享日常</p>
            <p>有问题欢迎讨论交流</p>
          </v-card-text>
        </v-card>
      </v-sheet>
    </template>
  </layout>
</template>

<script setup>
import { reactive,onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import {get} from '../../http/request'

const router = useRouter()
const drawer = reactive({ drawer: false });
const data = reactive({data:[]})
onBeforeMount(() => {
  getArticle()
})
function getArticle(){
  console.log(data)
  get('/api/post/list').then(res => {
    data.data = res.data
  })
}
function onDetal(obj) {
  router.push('detal/' + obj._id)
}
function onAbort() {
  drawer.drawer = !drawer.drawer;
}
function toGithub() {
  window.open('https://github.com/LH-hua');
}
</script>
