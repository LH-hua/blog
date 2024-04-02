import { post } from './http'

export const login = (p) => post('user/login', p)
export const upload = (p) => post('file/upload-image', p)
