<template>
  <div>
    <v-table fixed-header height="100%">
      <thead>
        <tr>
          <th class="text-left">时间</th>
          <th class="text-left">标题</th>
          <th class="text-left">作者</th>
          <th class="text-left">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articleList" :key="item">
          <td>{{ item.timer }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.auther }}</td>
          <td>
            <v-btn variant="flat" size="small" color="error"> 删除 </v-btn>
            &nbsp;
            <v-btn variant="flat" size="small" color="secondary"> 编辑 </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const articleList = reactive([
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },
  {
    timer: "2023-02-10 10:00",
    auther: "xxx",
    title: "test",
  },

]);
</script>