<template>
  <div>
    <v-card flat>
      <v-toolbar density="compact">
        <v-btn icon @click="handlerAdd">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="d-flex flex-wrap ga-4 align-center justify-start">
        <v-card v-for="item in data" :key="item.captcha" flat border>
          <v-toolbar density="compact">
            <v-spacer></v-spacer>
            <v-btn icon color="#90CAF9" @click="handlerDialog(item)">
              <v-icon>mdi-application-edit</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>{{ item.time }}</v-card-subtitle>
          <v-card-text>{{ item.text }}</v-card-text>
        </v-card>
        <!-- <v-timeline align="start">
          <v-timeline-item dot-color="pink" size="small" v-for="item in data" :key="item.captcha">
            <v-card flat>
              <v-card-item>
                <v-toolbar density="compact">
                  <v-app-bar-nav-icon>
                    <v-icon>mdi-label</v-icon>
                  </v-app-bar-nav-icon>
                  <v-toolbar-title>{{ item.captcha }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-title>{{ item.captcha }}</v-card-title>
                <v-card-subtitle>{{ item.time }}</v-card-subtitle>
                <v-card-text>{{ item.text }}</v-card-text>
              </v-card-item>
              <v-card-actions>
                <v-btn color="#90CAF9" variant="outlined" @click="handlerDialog(item)">修改</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-timeline-item>
        </v-timeline> -->
      </v-card-text>
    </v-card>
    <v-dialog max-width="500" v-model="dialog">
      <v-card flat>
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-list-subheader>标题：</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-text-field v-model="edit.captcha" variant="outlined" density="compact" placeholder="标题"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-list-subheader>描述：</v-list-subheader>
            </v-col>
            <v-col cols="10">
              <v-textarea v-model="edit.text" variant="outlined" density="compact" placeholder="描述"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#90CAF9" variant="outlined" @click="handlerOk">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { getCaptcha, editCaptcha } from '@/http/article'

const data = ref()
const dialog = ref(false)
const edit = ref({
  text: '',
  captcha: '',
})

const handlerAdd = () => {
  dialog.value = true
}
const handlerDialog = (item) => {
  edit.value = item
  dialog.value = true
}
const captcha = () => {
  getCaptcha().then((res) => {
    data.value = res.data.data
  })
}
const handlerOk = () => {
  editCaptcha(edit.value).then((res) => {
    captcha()
    dialog.value = false
  })
}

onBeforeMount(() => {
  captcha()
})
</script>
