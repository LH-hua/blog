export class Scroll {
  constructor() {}
  loading() {
    window.addEventListener('scroll', this.scroll)
  }
  remove() {
    window.removeEventListener('scroll', this.scroll)
  }
  scroll() {
    // 获取滚动的垂直距离
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const header = document.querySelector('.v-app-bar.v-toolbar')
    // 处理滚动事件
    if (scrollTop > 5) {
      header.style.background = 'rgba(255, 255, 255, 0.5)'
      header.style.color = 'black'
      header.style.boxShadow = '0px 0px 10px rgba(255, 255, 255, 0.5)'
    } else {
      header.style.background = 'transparent'
      header.style.color = 'white'
      header.style.boxShadow = 'none'
    }
  }
}

export const rules = {
  nameRequired: (value) => !!value || '用户名不能为空',
  passwordRequired: (value) => !!value || '密码不能为空',
  code: (value) => !!value || '验证码不能为空',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '邮箱格式不正确'
  },
}
