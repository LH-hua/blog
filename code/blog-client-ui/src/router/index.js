import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/config/routes'
import preject from '@/views/project/index.vue'
import { userInfo } from '@/store'

// import { get } from '@/http/request'

// async function query() {
//   const data = await get('/api/sys/menus/list')
//   console.log(data)
// }
// query()
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

const routesTo = [
  {
    path: '/posts/new',
    component: () => import('@/views/post/new.vue'),
    meta: {
      title: '发起话题',
    },
  },
  {
    path: '/posts/edit/:id',
    component: () => import('@/views/post/edit.vue'),
    meta: {
      title: '发起话题',
    },
  },
  {
    path: '/categories/new',
    component: () => import('@/views/post/categories-new.vue'),
  },
]
router.beforeEach((to, from, next) => {
  const userLogin = userInfo().isLogin
  if (userLogin) {
    routesTo.forEach((item) => {
      router.addRoute('index', item)
    })
  }
  if (to.meta.content) {
    let head = document.getElementsByTagName('head')
    let meta = document.createElement('meta')
    document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
    meta.content = to.meta.content
    head[0].appendChild(meta)
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
