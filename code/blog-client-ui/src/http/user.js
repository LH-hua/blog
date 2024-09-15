import { post, get } from './request'
export function useLogin(data) {
  return post('/api/user/login', data)
}
export function getUserInfo(data) {
  return get('/api/user/info', data)
}
