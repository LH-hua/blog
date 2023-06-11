<template>
  <div>
    <div class="tools">
      <v-sheet :width="230" class="pa-4">
        <div style="display: flex;">
          图层<v-spacer></v-spacer><v-select
            density
            :items="TDT_IMAGE"
            item-title="name"
            item-value="key"
            variant="outlined"
            @click="onChangeImage"
          ></v-select>
        </div>
        <div style="display: flex;">
          注记<v-spacer></v-spacer><v-select
            density
            :items="TDT_Annotation"
            item-title="name"
            item-value="key"
            variant="outlined"
            @click="onChangeImage"
          ></v-select>
        </div>
        <div>
          <v-btn flat>取 消</v-btn>
          <v-btn flat>加 载</v-btn>
        </div>
      </v-sheet>
    </div>
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { map, provider } from "@/utils/ceisum.map";
import { TDT_IMAGE,TDT_Annotation } from "@/config/default";

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
