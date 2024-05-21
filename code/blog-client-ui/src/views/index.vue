<template>
  <div>
    <section>
      <!-- <v-carousel :show-arrows="false">
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
      </v-carousel> -->
      <v-img  aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
    </section>
    <section>
      <div class="box">
        <v-card style="width: 20%; height: 10vh">
          <v-card-title>webGIS应用</v-card-title>
          <v-card-text
            >WebGIS（Web
            GIS）是一种基于Web的地理信息系统，它可以实现地理空间数据的查询、分析、管理和可视化，我们在探索webGIS应用领域和提供webGIS技术</v-card-text
          >
        </v-card>
        <v-card style="width: 20%; height: 10vh">
          <v-card-title>技术文章</v-card-title>
          <v-card-text>通过本站，我们持续输出遇到的问题以及解决方案</v-card-text>
        </v-card>
        <v-card style="width: 20%; height: 10vh">
          <v-card-title>场景展示</v-card-title>
          <v-card-text>对一些应用场景展示</v-card-text>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script setup>
const items = [
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
  },
  {
    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  },
]
</script>

<style scoped>
section {
  height: 50vh;
}
.box {
  height: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
</style>
