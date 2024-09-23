<template>
  <div class="containner">
    <side-main>
      <template #main>
        <v-sheet class="pa-5">
          <div>
            <v-chip-group>
              <v-chip class="ma-2" variant="text" label v-for="item in data.captcha" :key="item" @click="handlerCategorie(item)">
                {{ item.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
        <v-sheet class="pa-5" style="margin-top: 10px">
          <v-overlay :model-value="overlay" @click:outside="outside" class="align-center justify-center">
            <v-img max-width="1200" width="500" height="700" :src="fileImage"></v-img>
          </v-overlay>
          <v-sheet>
            <div style="width: 100%; display: flex; justify-content: space-between; margin-bottom: 10px">
              <div style="flex: 1"></div>
              <div style="flex: 1">
                <v-pagination @update:modelValue="curry" @next="next" @prev="prev" :length="params.total" density="compact"></v-pagination>
              </div>
            </div>
          </v-sheet>

          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap">
            <v-card v-for="item in data.jianliLIst" :key="item">
              <v-img height="230px" width="230px" :src="item.imgPath"></v-img>

              <v-card-title>
                <span>{{ item.key[0] }}</span>
              </v-card-title>

              <v-card-subtitle>
                <div>{{ item.key[1] }}</div>
              </v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#64B5F6" variant="outlined" size="small" @click="seeImage(item)">图片预览</v-btn>
                <v-btn color="#64B5F6" variant="outlined" size="small" @click="isHighDownPayload(item)"> 交换并下载</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-sheet>
      </template>
      <template #side>
        <v-sheet class="pa-5">
          <v-card flat>
            <v-card-title> 规则 </v-card-title>
            <v-card-text>
              <ul>
                <li>可以使用硬币来换取对应的物品</li>
                <li>一件物品需要3枚硬币,下次想要同样的物品需要给3枚硬币</li>
                <li>硬币获取方式：通过发帖子可获得硬币，一篇帖子可获得2枚硬币</li>
                <li>评论可获得一枚硬币</li>
                <li>帖子置顶可获得10枚硬币</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-sheet>
        <v-sheet class="pa-5" style="margin-top: 10px">
          <v-card flat>
            <v-card-title> 提示 </v-card-title>
            <v-card-text>
              <ul>
                <li>简历下载格式.doc .docx</li>
                <li>下载之后修改内容即可</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-sheet>
      </template>
    </side-main>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get, post,request } from '@/http/request'
import { userInfo } from '@/store/userStore'

const overlay = ref(false)
const fileImage = ref('')
const data = reactive({
  jianliLIst: [],
  captcha: [],
})
const router = useRouter()
const user = userInfo()
const params = reactive({
  captcha: '',
  pageSize: 12,
  currePage: 1,
  total: 2,
})
function isHighDownPayload(item) {
  if (!user.isLogin) {
    return router.push({ name: 'login' })
  }

  request.get('/api/jianli/download', {
    params: { dPath: item.docPath },
    responseType: 'blob',
  }).then((res) => {
    const blob = new Blob([res.data], { type: 'application/octet-stream;charset=UTF-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'aaa.docx'
    a.style.display = 'none'
    // 将 <a> 标签添加到文档中
    document.body.appendChild(a)
    // 触发点击事件
    a.click()
    // 移除 <a> 标签
    document.body.removeChild(a)
  })
}
function curry(num) {
  params.currePage = num
  query()
}
function next(num) {
  params.currePage = num
  query()
}
function prev(num) {
  params.currePage = num
  query()
}
function handlerCategorie(item) {
  params.captcha = item.name
  params.pageSize = 12
  params.currePage = 1
  params.total = 0
  query()
}
function outside(t) {
  console.log(t)
  overlay.value = false
}
function seeImage(item) {
  fileImage.value = item.imgPath
  overlay.value = true
}
function queryCaptcha() {
  get('/api/jianli/captcha').then((res) => {
    data.captcha = res.data
  })
}
function query() {
  get('/api/jianli/query', params).then((res) => {
    console.log(res.data)
    data.jianliLIst = res.data
    params.total = Math.ceil(res.total / params.pageSize)
  })
}

onBeforeMount(() => {
  queryCaptcha()
  query()
})
</script>

<style lang="scss" scoped>
.containner {
  background: #edf2f7;
  min-height: calc(100vh - 48px);
  ul {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
