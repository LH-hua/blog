import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getArticleList } from '@/http/article'

export const userSearchFilters = defineStore(
  'search',
  () => {
    let state = reactive({
      history: [],
      data: {},
    })
    const query = (params) => {
      history(params.title)
      return new Promise((resolve) => {
        getArticleList(params).then((res) => {
          state.num += 1
          console.log(state.num)
          state.data = res.data
          resolve(res.data)
        })
      })
    }
    //   将搜索内容保存到本地
    const history = (search) => {
      if (search) {
        state.history.push(search)
        const historyStr = localStorage.getItem('search')
        if (historyStr) {
          const historyArr = JSON.parse(historyStr)
          let newSearch = [...state.history, ...historyArr]
          newSearch = Array.from(new Set(newSearch))
          const s = JSON.stringify(newSearch)
          localStorage.setItem('search', s)
        } else {
          const newSearch = state.history
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

    return { state, query, history, clear }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['state'],
      key: 'statePiniaStore',
    },
  }
)
