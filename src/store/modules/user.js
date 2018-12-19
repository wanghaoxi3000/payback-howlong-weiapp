import {
  login
} from '@/api/auth.js'

const user = {
  state: {
    token: '',
    nowTime: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    NOW_TIME: (state, nowTime) => {
      state.nowTime = nowTime
    }
  },

  actions: {
    Login ({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        login(id).then(response => {
          commit('SET_TOKEN', response.data.token)
          commit('NOW_TIME', Date.now())
          resolve()
        }).catch(error => {
          wx.reportMonitor('0', 1)
          reject(error)
        })
      })
    }
  }
}

export default user
