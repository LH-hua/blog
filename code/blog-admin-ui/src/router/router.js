
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
        name: 'login',
        component: () => import('@/views/login.vue'),
    }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    const token = sessionStorage.getItem('token')
    if (token) {
        console.log(token)
        next()
    }
    else {
        console.log(token)
        next({ name: 'login' })
    }

})

export default router

