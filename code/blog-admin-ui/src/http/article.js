import { get,post } from './http'

export const article = p => get('/article/articles',p)
export const addArticle = p => post('/add/articles',p)