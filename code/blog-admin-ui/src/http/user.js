import { post } from './http'

export const login = (p) => post('/api/admin/login', p)
export const upload = (p) => post('/api/file/upload-image', p)
