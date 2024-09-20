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
        path: 'post',
        name: '技术社区',
        component: () => import('@/views/article/list.vue'),
        meta: {
          title: '技术社区',
        },
      },
      {
        path: 'show',
        name: 'show',
        component: () => import('@/views/show/index.vue'),
      },
      {
        path: 'pastBooks',
        name: 'pastBooks',
        component: () => import('@/views/pastBooks/index.vue'),
      },
      {
        path: 'easyHouse',
        name: 'easyHouse',
        component: () => import('@/views/easyHouse/index.vue'),
      },
      {
        path: 'post/:id',
        name: 'post',
        component: () => import('@/views/article/post.vue'),
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
        path: '/demand',
        name: 'demand',
        component: () => import('@/views/demand/index.vue'),
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
    path: '/userSpace/:id',
    name: 'userSpace',
    component: () => import('@/views/user/userSpace.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('@/views/user/userInfo.vue'),
  },
  {
    path: '/user/login',
    name: 'regsiter',
    component: () => import('@/views/user/regsiter.vue'),
  },
  {
    path: '/user/forget',
    name: 'forget',
    component: () => import('@/views/user/forget.vue'),
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
