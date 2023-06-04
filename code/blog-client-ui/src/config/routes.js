
const routes = [
  { path: "/", redirect: "/article" },
  {
    path: "/article",
    name: "home",
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: "list",
        name: "list",
        component: () => import('@/views/article/list.vue'),
      },
      {
        path: "detal/:id",
        name: "detal",
        component: () => import('@/views/article/detal.vue'),
      }
    ]
  },
]

export default routes