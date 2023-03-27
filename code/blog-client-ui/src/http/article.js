import { get,post } from './http'

export const article = p => get('/article/articles',p)
export const detail = p => get('/article/detail',p)
export const addArticle = p => post('/article/add',p)