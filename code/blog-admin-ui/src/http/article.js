import { get, post } from './http'

export const article = (p) => get('/post/list', p)
export const addArticle = (p) => post('/post/create', p)
