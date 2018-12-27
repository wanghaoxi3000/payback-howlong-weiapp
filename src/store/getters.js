const getters = {
  token: state => state.user.token,
  jwtToken: state => `Bearer ${state.user.token}`,
  nowTime: state => state.user.nowTime
}

export default getters
