import Vue from 'vue'
import App from '@/App'
import store from '@/store'

Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
