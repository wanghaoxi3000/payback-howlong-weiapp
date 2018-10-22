const Fly = require('flyio/dist/npm/wx')

const fly = new Fly()
fly.config.timeout = 15 * 1000
fly.config.baseURL = process.env.MOCK_URL

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(response.data)
    }

    return response
  },
  (err) => {
    console.log(err)
    return err
  }
)

export default fly
