
import * as VueRouter from 'vue-router'


const routes = [
    {
        path: "/",
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: "article",
                component: () => import('@/views/article/article.vue'),
            },
            {
                path: "editArticle",
                component: () => import('@/views/article/editArticle.vue'),
            }
        ]
    }, {
        path: "/login",
        component: () => import('@/views/login.vue'),
    }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router

