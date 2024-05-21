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
