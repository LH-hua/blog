<template>
  <div>
    <v-card flat color="transparent">
      <v-toolbar density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>作品</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <div style="column-count: 5;column-gap: 20px;row-gap: 20px;">
          <v-card flat style="margin-bottom: 20px;" border>
            <v-toolbar density="compact">
              <v-btn icon color="#90CAF9">
                <v-icon>mdi-label</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-item>
              <v-card-text>
                <div style="width: 300px" class="d-flex flex-wrap ga-4 align-center justify-center text-h1 text-center">+</div>
              </v-card-text>
            </v-card-item>
          </v-card>
          <!-- 内容 -->
          <v-card v-for="item in data.dataList" :key="item._id" flat border style="margin-bottom: 20px;">
            <v-toolbar density="compact">
              <v-btn icon color="#90CAF9">
                <v-icon>mdi-label</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="#90CAF9" @click="handlerEdit(item)">
                <v-icon>mdi-application-edit</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-item>
              <v-img :src="item.cover" :width="'100%'"> </v-img>
              <v-card-title>
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.subtitle }}
              </v-card-subtitle>
            </v-card-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#90CAF9" variant="outlined" @click="handlerOverlay(item)">预览</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog max-width="500" v-model="dialog">
      <v-card flat>
        <v-card-item>
          <v-card-title>编辑</v-card-title>
        </v-card-item>
        <v-card-text>
          <v-container fluit>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>标题：</v-list-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="edit.title" variant="outlined" density="compact" placeholder="标题"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>子标题：</v-list-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="edit.subtitle" variant="outlined" density="compact" placeholder="子标题"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>描述：</v-list-subheader>
              </v-col>
              <v-col cols="8">
                <v-textarea v-model="edit.desc" variant="outlined" density="compact" placeholder="描述一下吧"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-list-subheader>图片：</v-list-subheader>
              </v-col>
              <v-col cols="8">
                <v-file-input
                  prepend-icon=""
                  variant="outlined"
                  density="compact"
                  placeholder="上传一张图片吧"
                  accept="image/png, image/jpeg, image/bmp"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row v-if="edit.cover">
              <v-col cols="3">
                <v-list-subheader></v-list-subheader>
              </v-col>
              <v-col cols="8">
                <v-img :src="edit.cover"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="确定" @click="ok"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay v-model="overlay" class="align-center justify-center">
      <v-img :src="image" width="70vw"></v-img>
    </v-overlay>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { prejectList } from '@/http/preject'

const overlay = ref(false)
const dialog = ref(false)
const edit = ref({
  _id: '',
  title: '',
  subtitle: '',
  cover: '',
})
const image = ref()

const data = reactive({
  dataList: [],
})

const handlerEdit = (item) => {
  console.log(item)
  dialog.value = true
  edit.value = item
}
const handlerOverlay = (item) => {
  overlay.value = true
  image.value = item.cover
}

onBeforeMount(() => {
  prejectList().then((res) => {
    data.dataList = res.data.data
  })
})
</script>
