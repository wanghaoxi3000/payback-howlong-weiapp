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
    console.log(Date.now() - store.getters.nowTime)
    if (Date.now() - store.getters.nowTime > 60) {
      tokenrRefresh.request('/auth/refresh-token/', {}, {
        method: 'get',
        timeout: 5000, // 超时设置为5s
        headers: {
          'Authorization': store.getters.jwtToken
        }
      }).then(res => {
        console.log(res.data.token, 44444444)
        console.log(res.data.token === store.getters.token)
        store.commit('SET_TOKEN', res.data.token)
        store.commit('NOW_TIME', Date.now())
      }, err => {
        console.log('Refresh Token Error: ' + err)
      })
    }
  }

  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
// fly.interceptors.response.use(
//   (response) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.log(response.data)
//     }
//     return response
//   },
//   (err) => {
//     console.log(err.status)
//     return err
//   }
// )

export default fly
