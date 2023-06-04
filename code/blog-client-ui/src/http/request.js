import axios from "axios"

const request = axios.create({
    
  baseURL:import.meta.env.VITE_BASEURL
})
// request.defaults.headers.Authorization = 'token'
request.interceptors.request.use(function(config){
  // config.headers.common['Authorization'] = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
//   config.headers['Authorization'] = 'token'
//   config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return config
},(erro) => {
  alert(erro)
})
request.interceptors.response.use(function(response){
    
  return response
},(erro) => {
  console.log(erro)
})

export function get(url,data){
    return new Promise((resolve,reject) => {
        request({
            url:url,
            method:'GET',
            params:data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
export function post(url,data){
    return new Promise((resolve,reject) => {
        request({
            url:url,
            method:'POST',
            data:data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}