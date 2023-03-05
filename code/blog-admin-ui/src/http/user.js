import { post } from './http'

export const login = p => post('user/login',p)