import { get, post } from './request'

export function getArticleList(params) {
  return get('/api/post/list', params)
}

export function getArticleDetal(params) {
  return get('/api/post/detail', params)
}

export function addArticle(data) {
  return post('/api/post/findOneAndUpdate', data)
}

export function getCaptcha(data) {
  return get('/api/post/captcha', data)
}

export function getNewPost(data) {
  return get('/api/post/new', data)
}
