<template>
  <div>
    <section style="height: 40vh" class="section-1">
      <!-- <v-carousel :show-arrows="false">
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
      </v-carousel> -->
      <h2>LHGO</h2>
      <div>欢迎访问lhgo</div>
    </section>
    <v-divider :thickness="1"></v-divider>
    <section>
      <div class="box">
        <v-card flat style="width: 60%; height: 30vh">
          <v-card-title></v-card-title>
          <v-card-text style="display: flex; justify-content: space-between; align-items: center">
            <div class="left" style="flex: 4">
              <!-- <div class="skew-elm2">
                <div class="img"></div>
              </div> -->
            </div>
            <div style="flex: 5">
              <div class="text-h4">基础功能</div>
              <br />
              为个性化需求提供最灵活的解决方案，提供最大自由度的功能demo，让用户能够完全自定义开发自己的业务场景。
              <br />
              <br />
              <v-btn variant="outlined" @click="handlerToRouterExamples('/examples')"> 点击访问 </v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-card flat style="width: 60%; height: 30vh">
          <v-card-title></v-card-title>
          <v-card-text style="display: flex; justify-content: space-between; align-items: center">
            <div style="flex: 5">
              <div class="text-h4">博客</div>
              <br />
              输出各种场景案列文章
              <br />
              <br />
              <v-btn variant="outlined" @click="handlerToRouter('/post')"> 点击访问 </v-btn>
            </div>
            <div class="right" style="flex: 4"></div>
          </v-card-text>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const handlerToRouter = (item) => {
  router.push(item)
}

const handlerToRouterExamples = (item) =>{
  const href = router.resolve(item)
  window.open(href.href, '_blank')
}
</script>

<style scoped lang="scss">
.section-1 {
  background-image: url('/images/examples1.png');
  background-position-y: center;
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
section {
  height: 50vh;
}
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  .skew-elm1 {
    width: 50%;
    height: 0;
    border-right: 200px solid transparent;
    border-bottom: 200px solid transparent;
    .skew-elm2 {
      .img {
        height: 100%;
        background-image: url('/images/20240328222958.jpg');
      }
    }
  }
  .left {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .left::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/examples.png') no-repeat center center;
    background-size: cover;
    clip-path: polygon(0 0, 65% 0, 100% 100%, 0% 100%);
  }
  .right {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .right::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/examples2.png') no-repeat center center;
    background-size: cover;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 45% 100%);
  }
}
</style>
