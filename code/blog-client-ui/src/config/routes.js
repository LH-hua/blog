
const routes = [
  { path: "/", redirect: "/post/list" },
  {
    path: "/",
    name: "home",
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: "post/",
        name: "post",
        component: () => import('@/views/article/index.vue'),
        children: [
          {
            path: "list",
            name: "列表",
            component: () => import('@/views/article/list.vue'),
          },
          {
            path: "detal/:id",
            name: "详情",
            component: () => import('@/views/article/detal.vue'),
          },
          
        ]
      },
    ]
  },
  {
    path: "/gis",
    name: "gis",
    component: () => import('@/views/gis/index.vue'),
  },
  {
    path: "/indoors",
    name: "indoors",
    component: () => import('@/views/indoors/index.vue'),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import('@/views/404.vue'),
  }
]

export default routes