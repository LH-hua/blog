<template>
  <div>
    <v-file-input
      v-model="imageFile"
      label="选择图片"
      accept="image/*"
      append-inner-icon="mdi-file-image"
      density="compact"
      variant="outlined"
      @change="onFileChange"
      @click:clear="clearImage"
    ></v-file-input>
    <v-img v-if="imageUrl" :src="imageUrl" alt="Image Preview" max-width="100%" max-height="100px" class="mt-4"></v-img>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits, toRaw } from 'vue'

const props = defineProps({
  initialImageUrl: {
    type: String,
    default: '',
  },
  uploadUrl: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['uploadImage', 'clearImage'])
const imageFile = ref(null)
const imageUrl = ref(props.initialImageUrl)

watch(
  () => props.initialImageUrl,
  (newUrl) => {
    imageUrl.value = newUrl
  }
)

const clearImage = () => {
  imageFile.value = null
  imageUrl.value = null
  emits('clearImage', imageUrl.value)
}
// 文件选择时更新预览
const onFileChange = () => {
  if (imageFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      reader.readAsDataURL(imageFile.value)
    }
    emits('uploadImage', toRaw(imageFile.value))
  }
}

onMounted(() => {
  if (props.initialImageUrl) {
    imageUrl.value = props.initialImageUrl
  }
})
</script>

<style scoped>
/* 可选：添加一些自定义样式 */
</style>
