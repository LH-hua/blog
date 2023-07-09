import { post } from "./request";
export function userMenuRoute(data){
    return post("/api/sys/token/menuAndRouter",data)
}