import { get, post } from './http'

export const article = (p) => get('/post/list', p)
export const addArticle = (p) => post('/post/findOneAndUpdate', p)
export const getPostDetal = (p) => get('/post/detail', p)
export const getCaptcha = (p) => get('post/captcha', p)
