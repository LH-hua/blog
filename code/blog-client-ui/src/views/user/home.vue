<template>
  <div>home</div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
onBeforeMount(() => {
  console.log(route.params)
})
</script>
