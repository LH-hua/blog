import {get} from './request'

export function getArticleList(){
    return get('/api/article/articles')
}