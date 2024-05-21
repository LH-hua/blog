const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index.vue'),
      },
      {
        path: 'post/',
        name: 'post',
        component: () => import('@/views/article/index.vue'),
        children: [
          {
            path: 'list',
            name: '列表',
            component: () => import('@/views/article/list.vue'),
          },
          {
            path: 'detal/:id',
            name: '详情',
            component: () => import('@/views/article/detal.vue'),
          },
          {
            path: 'book',
            name: '分类',
            component: () => import('@/views/book/index.vue'),
          },
        ],
      },
      {
        path: 'preject',
        name: '项目展示',
        component: () => import('@/views/preject/index.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
]

export default routes
