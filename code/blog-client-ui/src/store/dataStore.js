import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getArticleList, getCaptcha } from '@/http/article'

export const userDataList = defineStore(
  'dataList',
  () => {
    const postList = ref([])
    const captchaList = ref([])
    const history = ref([])
    const key = ref('')

    const queryPost = (params) => {
      if (params && params.title) saveHistory(params.title)
      // 查询文章
      return new Promise((resolve) => {
        getArticleList(params).then((res) => {
          postList.value = res.data
          resolve(postList.value)
        })
      })
    }

    const queryCaptcha = (params) => {
      // 查询文章分类话题
      return new Promise((resolve) => {
        getCaptcha(params).then((res) => {
          captchaList.value = res.data
          resolve(captchaList.value)
        })
      })
    }
    //   将搜索内容保存到本地
    const saveHistory = (search) => {
      key.value = search
      if (search) {
        history.value.push(search)
        const historyStr = localStorage.getItem('search')
        if (historyStr) {
          const historyArr = JSON.parse(historyStr)
          let newSearch = [...history.value, ...historyArr]
          newSearch = Array.from(new Set(newSearch))
          const s = JSON.stringify(newSearch)
          localStorage.setItem('search', s)
        } else {
          const newSearch = history.value
          const s = JSON.stringify(newSearch)
          localStorage.setItem('search', s)
        }
      }
      const historyStr = localStorage.getItem('search')
      const historyArr = JSON.parse(historyStr)
      return historyArr
    }
    //   清除本地搜索记录
    const clear = () => {
      localStorage.removeItem('search')
    }

    return { postList, captchaList, queryPost, queryCaptcha, key, saveHistory, clear }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['postList', 'captchaList', 'history'],
      key: 'dataPiniaStore',
    },
  }
)
