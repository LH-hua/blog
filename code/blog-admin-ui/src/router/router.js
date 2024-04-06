import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/admin/',
    name: 'admin',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: 'article',
        component: () => import('@/views/article/article.vue'),
      },
      {
        path: 'editArticle',
        component: () => import('@/views/article/editArticle.vue'),
      },
      {
        path: 'preject',
        component: () => import('@/views/preject/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
]
const router = VueRouter.createRouter({
  base: '/admin',
  mode: 'history',
  history: VueRouter.createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
