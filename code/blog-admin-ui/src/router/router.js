
import * as VueRouter from 'vue-router'


const routes = [
    { path: "/", redirect: "/login" },
    {
        path: "/admin/",
        name:'admin',
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
    }, 
    {
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
    const token = sessionStorage.getItem('token')
    console.log(to)
    console.log(from)
    if(to.name !== 'login' && !token){
        next({ name: 'login' })
    }else{
        next()
    }

})

export default router

