import infoPage from '@/views/user/userInfo.vue'
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home.vue'),
    meta: {
      title: 'lhgo | 社区',
      content: {
        keywords: 'lhgo、昔日、美好的瞬间、知过去,聊未来',
        description: '在社区，我们进行有价值的话题讨论，分享过去那些美好的瞬间、民间话题。回忆不曾丢失，只是存在这里。',
      },
    },
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
        meta: {
          title: '详情',
          content: {
            keywords: '详情',
            description: '详情',
          },
        },
      },
      {
        path: '/posts/new',
        component: () => import('@/views/post/new.vue'),
        meta: {
          title: '发起话题',
        },
      },
      {
        path: '/categories/new',
        component: () => import('@/views/post/categories-new.vue'),
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
        meta: {
          title: '易事屋',
          content: {
            keywords: '易事屋、简历模板、简历、在线简历',
            description: '登录使用硬币交换想要的简历模板',
          },
        },
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/book/index.vue'),
      },
      {
        path: 'demand',
        name: 'demand',
        component: () => import('@/views/demand/index.vue'),
        meta: {
          title: '需求墙',
          content: {
            keywords: '需求墙、需求、墙',
            description: '场所欲言',
          },
        },
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
          title: '404',
          content: {
            keywords: '404',
            description: '找不到页面',
          },
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
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/user/home.vue'),
      },
      {
        path: 'account-circle',
        name: 'account-circle',
        component: () => import('@/views/user/account-circle.vue'),
      },
      {
        path: 'email',
        name: 'email',
        component: () => import('@/views/user/email.vue'),
      },
    ],
  },
  {
    path: '/user/login',
    name: 'login',
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
