
import * as VueRouter from 'vue-router'


const routes = [
    {
        path: "/",
        name:'index',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: "article",
                component: () => import('@/views/article/main.vue'),
            },
        ]
    }, 
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router

