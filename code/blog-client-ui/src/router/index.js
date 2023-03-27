
import * as VueRouter from 'vue-router'


const routes = [
    {
        path: "/", 
        redirect: "/home"
    },
    {
        path: "/",
        name:'index',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: "home",
                component: () => import('@/views/article/main.vue'),
            },
            {
                path:'post/:id',
                component:() => import('@/views/article/detal.vue')
            }
        ]
    }, 
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router

