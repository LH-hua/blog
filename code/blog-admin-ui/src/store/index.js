import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuItems = defineStore(
  'useMenuItems',
  () => {
    const state = ref()

    function setMenuItems(data) {
      state.value = data
    }
    return { state, setMenuItems }
  },
  {
    persist: {
      key: 'piniaStore', //存储名称
      storage: sessionStorage, // 存储方式
    },
  }
)
