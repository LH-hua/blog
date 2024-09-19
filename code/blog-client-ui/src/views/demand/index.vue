<template>
  <div class="container">
    <div class="bottom">
      <v-sheet rounded class="pa-4">
        <v-text-field
          label="你的需求"
          placeholder="输入你的想法"
          v-model="input"
          variant="outlined"
          density="compact"
          append-icon="mdi-send"
          :rules="rules"
          @click:append="handlerSend"
        >
          <template #prepend>
            <v-avatar v-if="user.isLogin">
              <v-img :src="user.user.avatar"></v-img>
            </v-avatar>
          </template>
        </v-text-field>
      </v-sheet>
    </div>
    <v-container>
      <div class="lh-main">
        <div v-for="item in data" :key="item.text">
          <div>
            <v-card flat color="transparent">
              <v-card-title class="d-flex">
                <div style="display: flex; justify-content: center; gap: 10px; font-size: 14px; align-items: center; color: rgba(0, 0, 0, 0.6)">
                  <v-avatar>
                    <v-img :src="item.auther.avatar"></v-img>
                  </v-avatar>
                  <div>来自{{ item.auther.username }}说</div>
                </div>
              </v-card-title>
              <v-card-text>
                {{ item.text }}
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref, h } from 'vue'; // 确保 h 已导入
import { userInfo } from '../../store/userStore';
import { get,post } from '@/http/request';

const box = ref({
  w: 300,
});
const messages = ref()
const user = userInfo()
const input = ref()
const data = ref()
const rules = ref([
        value => user.isLogin || '需要登录后才能描述你的需求哦',
        value => !!value || '没有任何输入哦',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ])
function getRandomArgbColor() {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min, max) => Math.random() * (max - min) + min;
  const red = getRandomInt(0, 255);
  const green = getRandomInt(0, 255);
  const blue = getRandomInt(0, 255);
  const alpha = Math.round(randomFloat(0, 255));
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}${alpha.toString(16).padStart(2, '0')}`;
}

function random(data,nodeClass){
    const w = window.innerWidth
    const h = window.window.innerHeight
    const positionX = Math.random(w - box.valuew) * 1000
    const positionY = Math.random(h - box.valueh) * 1000
    const dom = document.createElement('div')
    const header = document.createElement('span')
    dom.append(header)

    header.innerHTML = data.auther.username
    dom.className = 'tip'
    dom.style.top = positionY + 'px'
    dom.style.left = positionX + 'px'
    dom.style.background = getRandomArgbColor()
    const node = document.querySelector(nodeClass)
    dom.innerHTML = data.text

    node.append(dom)
}

function handlerSend(){
    messages.value = ''
    if(!user.isLogin){
        messages.value = '需要登录后才能描述你的需求哦'
        return
    }
    post('/api/demand/create',{u_id:'66e675b4b7366d27c5a61292',text:input.value}).then(res => {
        if(res.data.status == 200){
            query()
            input.value = ''
        }
    })
}
async function query() {
  const res = await get('/api/demand/list');
  if(res.status == 200){
        data.value = res.data
        setTimeout(col,500)

    }
}

function col(){
    const main = document.querySelector('.lh-main')
    const width = main.offsetWidth
    const children = main.children
    const nums =  Math.floor(width / children[0].offsetWidth)
    const items = []
    for(let i = 0; i < children.length; i++){
        children[i].style.background = getRandomArgbColor()
        if(i < nums){
            items.push(children[i].offsetHeight)
        }else{
            const obj = {
                minHeight:items[0],
                minI:0
            }
            for(let j = 0;j < items.length;j ++){
                if(items[j] < obj.minHeight){
                    obj.minHeight = items[j]
                    obj.minI = j
                }
            }
            children[i].style.position = 'absolute'
            children[i].style.left = children[obj.minI].offsetLeft + 'px'
            children[i].style.top = obj.minHeight + 'px'
            items[obj.minI] = items[obj.minI] + children[i].offsetHeight
        }
    }
}

onMounted(() => {
query()

});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  height: calc(100vh - 48px);
  //   background: linear-gradient(to bottom, white, #81d4fa);
}
.lh-main {
  width: 100%;
  position: relative;
}
.lh-main > div {
  float: left;
  padding: 5px;
  //   border: 1px solid #e0e0e0;
  //   border-radius: 5px;
}
.lh-main > div > div {
  width: 310px;
  word-wrap: break-word; /* 允许长单词或URL在必要时断开换行 */
  overflow-wrap: break-word; /* 同上，标准属性名 */
  white-space: pre-wrap; /* 保留空格和换行符，允许文本换行 */
  display: block; /* 确保容器为块级元素 */
  word-break: break-all; /* 强制单词在任意字符处断开换行 */
}
.bottom {
  position: absolute;
  width: 40vw;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1vh;
}
// .tip {
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   border-radius: 10px;
//   padding: 8px;
//   box-shadow: 0 0 10px 2px #e0e0e0;
//   background-color: white;
// }
</style>
