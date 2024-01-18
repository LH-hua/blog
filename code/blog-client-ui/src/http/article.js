import { get, post } from './request'

export function getArticleList() {
  return get('/api/post/article/articles')
}

export function getArticleDetal(params) {
  return get('/api/post/article/detail', params)
}

export function addArticle(data) {
  return post('/api/post/article/add', data)
}
