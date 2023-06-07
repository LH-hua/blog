<template>
  <div id="container"></div>
</template>

<script setup>
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { onMounted } from "vue";
import * as Cesium from "cesium";

onMounted(() => {
  const viewer = new Cesium.Viewer("container", {
    geocoder: false, // 位置查找工具
    homeButton: false, // 视角返回初始位置
    sceneModePicker: false, // 选择视角的模式（球体、平铺、斜视平铺）
    baseLayerPicker: false, // 图层选择器（地形影像服务）
    navigationHelpButton: false, // 导航帮助(手势，鼠标)
    animation: false, // 左下角仪表盘（动画器件）
    timeline: false, // 底部时间线
    fullscreenButton: false, // 全屏
    vrButton: false, // VR
  })
  viewer._cesiumWidget._creditContainer.style.display = "none"
});
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}
</style>
