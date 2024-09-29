<template>
  <div>
    <v-list>
      <v-list-item v-for="item in postLists" :key="item">
        <v-list-item-title
          ><a :href="'/posts/' + item._id" Target="_blank" v-html="highlightKeyword(item.title, searchKey)"></a
        ></v-list-item-title>
        <v-list-item-subtitle>
          <v-chip density="compact" color="primary" size="small"> {{ item.captchas_info.name }} </v-chip> · <span>{{ item.auther.username }}</span> ·
          <span>{{ dateFormat(item.date) }}</span> · <span>{{ item.readcount || 0 }} 阅读量</span></v-list-item-subtitle
        >
        <br />
        <v-divider></v-divider>
        <template v-slot:prepend>
          <v-avatar size="50">
            <v-img :src="item.auther.avatar"></v-img>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import moment from 'moment'
import { userDataList } from '../../store'

const userDataListStore = userDataList()
const postLists = computed(() => userDataListStore.postList)
const searchKey = computed(() => userDataListStore.key)

const dateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}

const highlightKeyword = (text, keyword) => {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: black;
}
mark {
  background-color: yellow; /* 设置高亮颜色 */
}
</style>
