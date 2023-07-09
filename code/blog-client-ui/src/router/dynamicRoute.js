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
    const modules = import.meta.glob("@/views/*/*.vue",{as:"url"})
    for (const key in modules) {
        modules[key]().then((mod) => {
            if (key == "/src/views/article/edit.vue") {
                console.log(key)
                router.addRoute({
                    path: "/post/add",
                    url: "/post/add",
                    name: "post",
                    component: () => import(mod),
                })
            }
        })
    }
}