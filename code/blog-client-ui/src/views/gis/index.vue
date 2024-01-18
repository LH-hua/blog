<template>
  <div style="height: 100%">
    <div style="width: 230px" class="tools">
      <v-sheet class="pa-4">
        <v-radio-group v-model="store.mode" @update:modelValue="onMode" inline>
          <v-radio label="三维" value="3D"></v-radio>
          <v-radio label="二维" value="2D"></v-radio>
        </v-radio-group>
        <v-select
          label="图层"
          density
          :items="TDT_IMAGE"
          item-title="name"
          item-value="key"
          variant="outlined"
          return-object
          @update:modelValue="onChangeImageLayer"
        ></v-select>
        <v-select
          label="注记"
          density
          :items="TDT_Annotation"
          item-title="name"
          item-value="key"
          variant="outlined"
          return-object
          @update:modelValue="onChangeLabelLayer"
        ></v-select>
        <v-select
          label="视角"
          density
          :items="geoCode"
          item-title="name"
          item-value="coord"
          variant="outlined"
          return-object
          @update:modelValue="onCamera"
        ></v-select>
        <div>
          <div>colorToAlpha:{{ store.colorToAlpha }}</div>
          <v-text-field density="compact" v-model="store.colorToAlpha" variant="outlined"></v-text-field>
          <v-btn flat variant="outlined" @click="colorToAlpha">确定</v-btn>
          <div>alpha:{{ store.alpha }}</div>
          <v-slider @update:modelValue="alpha" v-model="store.alpha" min="0" max="1" :step="0.1"> </v-slider>
          <div>brightness:{{ store.brightness }}</div>
          <v-slider @update:modelValue="brightness" v-model="store.brightness" :max="10" :step="0.1"> </v-slider>
          <div>contrast:{{ store.contrast }}</div>
          <v-slider @update:modelValue="contrast" v-model="store.contrast" :max="10" :step="0.1"> </v-slider>
          <div>hue:{{ store.hue }}</div>
          <v-slider @update:modelValue="hue" v-model="store.hue" :max="10" :step="0.1"> </v-slider>
          <div>saturation:{{ store.saturation }}</div>
          <v-slider @update:modelValue="saturation" v-model="store.saturation" :max="10" :step="0.1"> </v-slider>
          <div>gamma:{{ store.gamma }}</div>
          <v-slider @update:modelValue="gamma" v-model="store.gamma" :max="10" :step="0.1"> </v-slider>
        </div>
      </v-sheet>
    </div>
    <div id="container"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { map, provider, SceneMode } from '@/utils/ceisum.map'
import { TDT_IMAGE, TDT_Annotation, geoCode } from '@/config/default'

const store = reactive({ items: [], mode: '3D', alpha: 1, colorToAlpha: '#FB8C00', brightness: 0, contrast: 0, hue: 0, saturation: 0, gamma: 0 })

function colorToAlpha() {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.colorToAlpha = Cesium.Color.BLACK
  console.log(layer)
}

function alpha() {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.colorToAlpha = Cesium.Color.BLACK
}
function brightness(val) {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.alpha = val
}
function contrast(val) {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.contrast = val
}
function hue(val) {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.hue = val
}
function saturation(val) {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.saturation = val
}
function gamma(val) {
  const imageryLayers = store.viewer.imageryLayers
  const layer = imageryLayers.get(0)
  layer.gamma = val
}
function onLoadingLayer() {
  console.log(store)
}

function onMode(val) {
  console.log(val)
  SceneMode(store.viewer, val)
}

function onChangeImageLayer(obj) {
  if (store.imageLayer) {
    store.viewer.imageryLayers.remove(store.imageLayer)
  }

  store.imageLayer = provider(store.viewer, obj)
  console.log(store.viewer.imageryLayers)
}
function onChangeLabelLayer(obj) {
  if (store.labelLayer) {
    store.viewer.imageryLayers.remove(store.labelLayer)
  }

  store.labelLayer = provider(store.viewer, obj)
}
function onCamera(obj) {
  store.viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(...obj.coord, 100000),
  })
  // viewer.imageryLayers.get(0).show = false
}

onMounted(() => {
  store.viewer = map('container')

  const imageryLayers = store.viewer.imageryLayers

  const layer = imageryLayers.get(0)
  store.brightness = layer.brightness
  store.contrast = layer.contrast
  store.hue = layer.hue
  store.saturation = layer.saturation
  store.gamma = layer.gamma

  console.log(layer)

  // const promise = Cesium.GeoJsonDataSource.load("/json/中华人民共和国.json")
  // promise.then(dataSources => {
  //   store.viewer.dataSources.add(dataSources)
  //   const entities = dataSources.entities.values
  //   const colorHash = {}
  //   for (let i = 0;i < entities.length;i++) {
  //     const entity = entities[i]
  //     const name = entity.name
  //     let color = colorHash[name]
  //     if (!color) {
  //       color = Cesium.Color.fromRandom({
  //         alpha: 0.5,
  //       });
  //       colorHash[name] = color
  //     }

  //     //Set the polygon material to our random color.
  //     entity.polygon.material = color;
  //     //Remove the outlines.
  //     entity.polygon.outline = false
  //   }
  // })
})
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
}

.tools {
  position: absolute;
  color: white;
  z-index: 1000;
  cursor: pointer;
}
</style>
