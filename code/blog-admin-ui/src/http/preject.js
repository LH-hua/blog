import { get, post } from './http'

export function prejectList() {
  return get('/api/preject/list')
}
