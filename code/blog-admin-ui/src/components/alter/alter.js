import { createApp } from 'vue'
import test from './alter.vue'

export const test1 = () => {
    console.log(11)
    createApp(test).mount('#app3')
}