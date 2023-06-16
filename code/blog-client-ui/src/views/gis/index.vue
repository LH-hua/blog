<template>
  <div>
    <div class="tools">
      <v-sheet :width="230" class="pa-4">
        <v-select label="图层" density :items="TDT_IMAGE" item-title="name" item-value="key" variant="outlined"
          return-object @update:modelValue="onChangeImageLayer"></v-select>
        <v-select label="注记" density :items="TDT_Annotation" item-title="name" item-value="key" variant="outlined"
          return-object @update:modelValue="onChangeLabelLayer"></v-select>
          <v-select label="视角" density :items="geoCode" item-title="name" item-value="coord" variant="outlined"
            return-object @update:modelValue="onCamera"></v-select>
      </v-sheet>
    </div>
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { map, provider } from "@/utils/ceisum.map";
import { TDT_IMAGE, TDT_Annotation, geoCode } from "@/config/default";

const store = reactive({ items: [], });
function onLoadingLayer() {
  console.log(store)
}
function onChangeImageLayer(obj) {
  if (store.imageLayer) {
    store.viewer.imageryLayers.remove(store.imageLayer);
  }

  store.imageLayer = provider(store.viewer, obj);
}
function onChangeLabelLayer(obj) {
  if (store.labelLayer) {
    store.viewer.imageryLayers.remove(store.labelLayer);
  }

  store.labelLayer = provider(store.viewer, obj);
}
function onCamera(obj) {
  store.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(...obj.coord, 100000),
  })
  // viewer.imageryLayers.get(0).show = false
}

onMounted(() => {
  // for (let index = 0; index < TDT_IMAGE.length; index++) {
  //   const item = TDT_IMAGE[index];
  //   store.items.push({
  //     title: item.name,
  //     value: item.key,
  //     ...item,
  //   });
  // }

  store.viewer = map("container");
});
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}

.tools {
  position: absolute;
  color: white;
  z-index: 1000;
  cursor: pointer;
}
</style>
