import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      {
        name: 'list',
        path: '',
        component: () => import('../views/post/list.vue')
      },
      {
        path: 'detal/:id',
        name: '详情',
        component: () => import('../views/post/detal.vue'),
      },
    ]
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
