<template>
  <div class="container">
    <div class="bottom input">
      <v-sheet rounded class="pa-4">
        <v-text-field label="你的需求" variant="outlined" density="compact"></v-text-field>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted,ref,h } from 'vue';
import {get} from '@/http/request'

const box = ref({
    w:300,
    h:200
})
function getRandomArgbColor() {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min, max) => Math.random() * (max - min) + min;
  const red = getRandomInt(0, 255);
  const green = getRandomInt(0, 255);
  const blue = getRandomInt(0, 255);
  const alpha = Math.round(randomFloat(0, 255));
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}${alpha.toString(16).padStart(2, '0')}`;
}

// function random(data,nodeClass){
//     const w = window.innerWidth
//     const h = window.window.innerHeight
//     const positionX = Math.random(w - box.valuew) * 1000
//     const positionY = Math.random(h - box.valueh) * 1000
//     const dom = document.createElement('div')
//     dom.className = 'tip'
//     dom.style.top = positionY + 'px'
//     dom.style.left = positionX + 'px'
//     dom.style.background = getRandomArgbColor()
//     const node = document.querySelector(nodeClass)
//     dom.innerHTML = data
//     node.append(dom)
// }

function createNode(node){
    const w = window.innerWidth
    const h = window.window.innerHeight
    const positionX = Math.random(w - box.valuew) * 1000
    const positionY = Math.random(h - box.valueh) * 1000
    const vnode = h('div',{class:['tip'],style:{
      background: getRandomArgbColor(),
      top: `${positionY}px`,
      left: `${positionX}px`,
      position: 'absolute',}})
      console.log(vnode)
}
async function query() {
    const res = await get('/api/demand/list')
    createNode()

    if(res.status == 200){
        res.data.forEach(item => {
            // random(item.text,'.container')
        })
    }
}
onMounted(() => {
    query()
})
</script>

<style lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, white, #81d4fa);
  position: relative;
  .bottom {
    position: absolute;
    width: 40vw;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10vh;
  }
}
.tip {
  position: absolute;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 0 10px 2px #e0e0e0;
  background-color: white;
}
</style>
