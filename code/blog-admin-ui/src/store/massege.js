import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const usrMassegeStore = defineStore('massege', () => {
  const state = reactive({
    data: {
      isTrue: false,
      color: 'success',
      icon: '$success',
      title: '提示',
      text: '',
    },
  })
  const type = reactive(['success', 'info', 'error', 'warning'])
  const openMsg = (opt) => {
    state.data.isTrue = true
    type.map((i) => {
      if (opt.type == i) {
        state.data.color = i
        state.data.icon = `$${i}`
        state.data.text = opt.text
      }
    })
    setTimeout(() => {
      state.data.isTrue = false
    }, 3000)
  }

  const msg = () => {
    return state.data
  }
  return { openMsg, msg }
})
