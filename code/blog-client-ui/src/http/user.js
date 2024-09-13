import { post } from './request'
export function useLogin(data) {
  return post('/api/user/login', data)
}
