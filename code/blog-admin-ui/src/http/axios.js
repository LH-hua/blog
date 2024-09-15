import axios from 'axios'

console.log(import.meta.env.VITE_BASEURL)
const request = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
})
request.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    // config.headers.common['Authorization'] = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
    //   config.headers['Authorization'] = 'token'
    //   config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return config
  },
  (erro) => {
    alert(erro)
  }
)
request.interceptors.response.use(
  function (response) {
    return response
  },
  (erro) => {
    console.log(erro)
  }
)
export default request
