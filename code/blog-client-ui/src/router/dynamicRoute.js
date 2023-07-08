// import { useRouter, useRoute } from "vue-router";
import router from "./index"

export const asyncRoute = (token) => {
    // const router = useRouter();
    console.log(token)
    const routes = [
        {
            path: "/post/add",
            url: "/post/add",
            name: "post",
            component: "@/views/article/edit.vue",
        }
    ]
    routes.forEach(item => {
        const route = {
            path: item.url,
            name: item.name,
            component: import.meta.glob("@/views/article/edit.vue", { eager: true }),
        }
        console.log(route)
        console.log(`@/views/${item.component}`)
        // debugger
        if (item.parenRoute) {
            router.addRoute(item.parenRoute, route);
        } else {
            router.addRoute("post", route);
        }
        console.log(router)
    })

}