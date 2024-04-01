import { post, get } from './request'
export function userMenuRoute(data) {
  return post('/api/sys/token/menuAndRouter', data)
}
export function announcement() {
  return get('/api/sys/announcement')
}
