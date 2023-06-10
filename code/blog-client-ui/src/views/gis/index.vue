<template>
  <div>
    <div class="tools">
      <v-sheet :width="200" class="pa-8 ">
        <v-select
          label="图层"
          density
          :items="TDT_IMAGE"
          item-title="name"
          item-value="key"
          variant="outlined"
          @click="onChangeImage"
        ></v-select>
      </v-sheet>
    </div>
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { map, provider } from "@/utils/ceisum.map";
import { TDT_IMAGE } from "@/config/default";

const store = reactive({ items: [], layerSelect: "vec" });
function onChangeImage(obj) {
  console.log(obj);
  if (store.layer) {
    store.viewer.imageryLayers.remove(store.layer);
  }

  store.layer = provider(store.viewer, obj);
  console.log(store.viewer.imageryLayers._layers);
  // viewer.imageryLayers.get(0).show = false
}

onMounted(() => {
  for (let index = 0; index < TDT_IMAGE.length; index++) {
    const item = TDT_IMAGE[index];
    store.items.push({
      title: item.name,
      value: item.key,
      ...item,
    });
  }

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
