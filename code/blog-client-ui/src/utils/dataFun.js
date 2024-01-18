import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const route = useRoute()
export const router = useRouter()
export const dataObj = reactive({})
export const dataArr = reactive([])
