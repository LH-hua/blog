import { get, post } from './request'

export function getArticleList(params) {
  return get('/api/post/list', params)
}

export function getArticleDetal(params) {
  return get('/api/post/detail', params)
}
export function postReadCount(params) {
  return get('/api/post/readcount', params)
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

export function getComments(data) {
  return get('/api/post/comments/query', data)
}
export function newComment(data) {
  return post('/api/post/comments/new', data)
}
export function postDel(data) {
  return post('/api/post/delete', data)
}
