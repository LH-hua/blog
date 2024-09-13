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
      // {
      //   path: '',
      //   name: '首页',
      //   component: () => import('@/views/index.vue'),
      //   meta: {
      //     title: '首页',
      //   },
      // },
      {
        path: '',
        name: '技术社区',
        component: () => import('@/views/article/list.vue'),
        meta: {
          title: '技术社区',
        },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
      },
      {
        path: 'post/:id',
        name: 'post',
        component: () => import('@/views/article/post.vue'), // 'detal' 应该是 'detail'
        meta: {
          title: '详情',
        },
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/book/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'project',
        name: 'project',
        component: () => import('@/views/project/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('@/views/article/publish.vue'),
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/views/examples/index.vue'),
    meta: {
      title: '功能合集',
    },
  },
]

export default routes
