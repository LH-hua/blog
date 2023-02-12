
import * as VueRouter from 'vue-router'


const routes = [
    {
        path: "/",
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: "article",
                component: () => import('@/views/article/home.vue'),
            }
        ]
    }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router

