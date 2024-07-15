const routes = [
  // {
  //   path: '/',
  //   redirect: '/list',
  // },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '',
        name: 'list',
        component: () => import('@/views/article/list.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
      },
      {
        path: 'detail/:id',
        name: 'detail',
        component: () => import('@/views/article/detail.vue'), // 'detal' 应该是 'detail'
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/book/index.vue'),
      },
      {
        path: 'project',
        name: 'project',
        component: () => import('@/views/project/index.vue'),
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404.vue'),
      },
    ],
  },
]

export default routes
