import { get,post } from './http'

export const article = p => get('/api/get/articles',p)
export const addArticle = p => post('/api/post/add/articles',p)