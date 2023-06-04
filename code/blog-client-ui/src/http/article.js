import {get} from './request'

export function getArticleList(){
    return get('/api/article/articles')
}

export function getArticleDetal(params){
    return get('/api/article/detail',params)
}