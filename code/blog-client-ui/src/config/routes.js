import infoPage from '@/views/user/userInfo.vue'
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
        path: '/',
        component: () => import('@/views/post/index.vue'),
        children: [
          {
            path: '/',
            component: () => import('@/views/post/list.vue'),
          },
          {
            path: '/categories/:id',
            name: 'categories',
            component: () => import('@/views/post/list.vue'),
          },
        ],
      },
      {
        path: '/posts/:id',
        component: () => import('@/views/post/detail.vue'),
      },
      {
        path: '/posts/new',
        component: () => import('@/views/post/new.vue'),
      },
      {
        path: '/categories/new',
        component: () => import('@/views/post/categories-new.vue'),
      },
      {
        path: '/post',
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
    component: infoPage,
    children: [
      {
        path: '',
        component: () => import('@/views/user/info.vue'),
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/user/info.vue'),
      },
      {
        path: 'dynamic',
        name: 'dynamic',
        component: () => import('@/views/user/dynamic.vue'),
      },
    ],
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
