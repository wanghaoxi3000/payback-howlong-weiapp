import {
  login
} from '@/api/auth.js'
// import { parseTime } from '@/utils'

// import Cookies from 'js-cookie'

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
          console.log(error.response)
          reject(error)
        })
      })
    }
  }
}

export default user
