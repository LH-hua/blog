<template>
  <!-- <v-list density="compact"> -->
    <template v-for="item in tree" :key="item.text">
      <v-list-group v-if="item.chilren && item.chilren.length > 0" :value="item.text">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.text"></v-list-item>
        </template>
        <Menu :data="item.chilren" />
      </v-list-group>
      <v-list-item v-else :title="item.text" :prepend-icon="item.icon" @click.stop="handlerChange(item)"></v-list-item>
    </template>
  <!-- </v-list> -->
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['data'])

// 直接使用props.data，无需额外ref，因为props是响应式的
const tree = props.data

const router = useRouter()

// 如果handlerChange有具体用途，保留之；否则可移除
const handlerChange = (item) => {
  console.log(router)
  router.push(item.path)
}

// 如果onMounted内无特殊逻辑，也可省略
// onMounted(() => {
//   console.log(tree)
// })
</script>
