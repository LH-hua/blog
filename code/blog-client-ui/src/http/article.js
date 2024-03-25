import { get, post } from './request'

export function getArticleList() {
  return get('/api/post/list')
}

export function getArticleDetal(params) {
  return get('/api/post/detail', params)
}

export function addArticle(data) {
  return post('/api/post/add', data)
}

export function getCaptcha(data) {
  return get('/api/post/captcha', data)
}
