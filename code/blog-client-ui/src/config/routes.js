
const routes = [
  { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "home",
        component: () => import('@/views/home.vue'),
        children:[
          {
            path: "list",
            name:"list",
            component: () => import('@/views/article/list.vue'),
         }
        ]
  },
]

export default routes