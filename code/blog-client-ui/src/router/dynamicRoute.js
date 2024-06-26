// import { useRouter, useRoute } from "vue-router";
import router from './index'
import { userMenuRoute } from '@/http/sys'

export const asyncRoute = async (token) => {
  const res = await userMenuRoute()
  console.log(res)
  const menuArr = res.data.data
  const modules = import.meta.glob('@/views/*/*.vue')
  for (const key in modules) {
    modules[key]().then((mod) => {
      const file = mod.default
      for (let i = 0; i < menuArr.length; i++) {
        const item = menuArr[i]
        const componentPath = `/src/views${item.component}`
        if (key == componentPath) {
          const route = {
            path: item.url || item.path,
            component: file,
          }
          if (item.pName) {
            router.addRoute(item.pName, route)
          } else {
            router.addRoute(route)
          }
        }
      }
    })
  }
}
