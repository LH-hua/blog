<template>
  <div>
    <iframe class="iframe" src="http://8.134.217.110:4060"></iframe>
  </div>
</template>

<script>
import {onMounted} from 'vue'

onMounted(() => {
    window.document.title = '功能合集 | lhgo'
})
</script>

<style>
.iframe{
    width: 100vw;
    height: 100vh;
    border: none;
}
</style>
