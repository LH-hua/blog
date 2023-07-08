import { useRouter } from "vue-router";
export const dynamicAdd = (dynamicRoute) => {
    const router = useRouter();
    dynamicRoute.forEach(item => {
        router.addRoute(item.parenRoute,item);
    });
}