import { get, post } from './request'

export function userRoot() {
  return get('/api/user/find')
}
