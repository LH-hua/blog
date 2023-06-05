
const routes = [
  { path: "/", redirect: "/article" },
  {
    path: "/article",
    name: "home",
    component: () => import('@/views/home.vue'),
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
      }
    ]
  },
]

export default routes