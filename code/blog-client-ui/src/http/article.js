import {get} from './request'

export function getArticleList(){
    return get('/api/post/article/articles')
}

export function getArticleDetal(params){
    return get('/api/post/article/detail',params)
}