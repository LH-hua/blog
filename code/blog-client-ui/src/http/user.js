import { post } from "./request";
export function login(data){
    return post("/api/user/login",data)
}