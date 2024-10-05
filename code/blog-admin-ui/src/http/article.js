import { get, post } from './http'

export const article = (p) => get('/api/post/list', p)
export const addArticle = (p) => post('/api/post/findOneAndUpdate', p)
export const getPostDetal = (p) => get('/api/post/detail', p)
export const getCaptcha = (p) => get('/api/post/captcha', p)
export const editCaptcha = (p) => post('/api/admin/captcha/update', p)
export const deletePost = (p) => post('/api/post/delete', p)
