import { post } from './request'
export function useLogin(data) {
  return post('/api/user/post/login', data)
}
