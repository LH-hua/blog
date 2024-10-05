<template>
  <div>
    <v-card flat>
      <v-toolbar density="compact">
        <v-btn prepend-icon="mdi-plus" variant="tonal" color="blue" @click="handlerAdd">
          话题
        </v-btn>
      </v-toolbar>
      <v-card-text class="d-flex flex-wrap ga-4 align-center justify-start">
        <v-card v-for="item in data" :key="item.captcha" flat border width="200">
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
              <v-text-field v-model="edit.name" variant="outlined" density="compact" placeholder="标题"></v-text-field>
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
  name: '',
})

const handlerAdd = () => {
  dialog.value = true
}
const handlerDialog = (item) => {
  edit.value = {...item}
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
