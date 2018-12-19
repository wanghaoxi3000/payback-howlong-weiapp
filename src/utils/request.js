import store from '../store'
const Fly = require('flyio/dist/npm/wx')

const fly = new Fly()
fly.config.timeout = 15 * 1000
fly.config.baseURL = process.env.BASE_URL

const tokenrRefresh = new Fly()
tokenrRefresh.config.baseURL = process.env.BASE_URL

// request拦截器
fly.interceptors.request.use(request => {
  if (store.getters.token) {
    request.headers['Authorization'] = store.getters.jwtToken
    // 更新Token，延长过期时间
    if (Date.now() - store.getters.nowTime > 600) {
      tokenrRefresh.request('/auth/refresh-token/', {}, {
        method: 'get',
        timeout: 5000, // 超时设置为5s
        headers: {
          'Authorization': store.getters.jwtToken
        }
      }).then(res => {
        store.commit('SET_TOKEN', res.data.token)
        store.commit('NOW_TIME', Date.now())
      }, err => {
        wx.reportMonitor('1', 1)
        console.log('Refresh Token Error: ' + err)
      })
    }
  }

  return request
})

export default fly
