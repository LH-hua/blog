import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { get } from '@/http/request'

export const useGlobStore = defineStore(
  'GlobStore',
  () => {
    const menus = ref([])
    const queryMenus = () => {
      get('/api/sys/menus/list').then((res) => {
        menus.value = res.data.data
      })
    }
    return { menus, queryMenus }
  },
  {
    persist: {
      storage: localStorage,
      paths: [],
      key: 'GlobStore',
    },
  }
)
