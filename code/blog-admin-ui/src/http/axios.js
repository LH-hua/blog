import axios from 'axios';

console.log(import.meta.env.VITE_BASEURL)
const request = axios.create({
    
  baseURL:import.meta.env.VITE_BASEURL
})
// request.defaults.headers.Authorization = 'token'
request.interceptors.request.use(function(config){
  // config.headers.common['Authorization'] = 'token11'
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
export default request