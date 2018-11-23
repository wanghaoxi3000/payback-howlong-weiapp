import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const saveCookie = [] // 退出时不清除cookie的key

export function getToken () {
  console.log(Cookies.get(TokenKey), 88888888888888888888)
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeCookie () {
  for (const name in Cookies.get()) {
    if (saveCookie.includes(name)) {
      continue
    }
    Cookies.remove(name)
  }
}
