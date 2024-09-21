<template>
  <div class="containner">
    <side-main>
      <template #main>
        <div class="banner">
          <v-sheet :height="100" rounded>
            <div style="height: 100%; display: flex; flex-direction: column; justify-content: space-between">
              <div>
                <search></search>
              </div>
              <div>
                <v-btn-toggle divided>
                  <v-btn>总结篇</v-btn>
                  <v-btn>那些年</v-btn>
                  <v-btn>美好回忆</v-btn>
                  <v-btn>遗憾</v-btn>
                </v-btn-toggle>
              </div>
            </div>
          </v-sheet>
        </div>
        <div class="content">
          <div v-for="item in data" :key="item" class="box">
            <div class="title">{{ item.title }}</div>
            <div class="subtitle">
              <v-avatar size="25">
                <v-img :src="item.auther.avatar"></v-img>
              </v-avatar>
              <span>{{ item.auther.username }}</span>
              ·
              {{ dateFormat(item.date) }}
            </div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </template>
      <template #side>
        <v-sheet border rounded="lg" class="pa-2">
          <v-btn color="#f5f5f5" variant="flat" block> 添 加 话 题 </v-btn>
          <br />
          <v-btn color="#f5f5f5" variant="flat" block> 发 布 文 章 </v-btn>
        </v-sheet>
        <v-sheet style="margin-top: 10px" class="pa-2" rounded="lg" color="white" border>
        </v-sheet>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import moment from 'moment'
import { get } from '@/http/request'

import search from '@/components/input/search.vue'

const data = ref()

const dateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm')
}
const query = async () => {
  const res = await get('/api/pastBooks/list')
  if (res.status == 200) {
    data.value = res.data
  }
}
onBeforeMount(() => {
  query()
})
</script>

<style lang="scss" scoped>
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
}
.banner {
  margin-bottom: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.content {
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-between;
  //   align-items: center;
  gap: 10px;
  .box {
    position: relative;
    padding: 20px;
    width: 349px;
    // height: 100px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    .title {
      font-weight: 800;
      font-size: 18px;
    }
    .subtitle {
      color: rgba(0, 0, 0, 0.4);
      font-size: 14px;
    }
    .text {
      font-size: 16px;
      display: -webkit-box; /* 使用弹性盒子布局 */
      -webkit-line-clamp: 3; /* 最多显示三行 */
      -webkit-box-orient: vertical; /* 垂直方向排列 */
      overflow: hidden; /* 隐藏溢出的内容 */
      text-overflow: ellipsis; /* 显示省略号 */
    }
  }
  .box::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 5px;
    height: 100%;
    border-radius: 50px 0 0 50px;
    background-color: #ed64a6;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }
  .box:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -1px rgba(0, 0, 0, 0.1);
  }
  .box:hover::before {
    transform: scaleX(1);
  }
}
</style>
