import Vue from 'vue'
import App from '@/App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'payback-howlong-weia-33jef',
  traceUser: true
})

Vue.mixin({
  onUnload () {
    if (this.$options.data) {
      Object.assign(this.$data, this.$options.data()) // 重置组件数据状态
    }
  }
})

const app = new Vue(App)
app.$mount()
