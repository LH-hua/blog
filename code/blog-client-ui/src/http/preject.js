import { get, post } from './request'

export function prejectList() {
  return get('/api/preject/list')
}
