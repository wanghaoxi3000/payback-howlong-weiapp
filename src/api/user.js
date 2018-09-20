import fly from '@/utils/request'

export function login(openid) {
  return fly.post("/users/", {openid})
}
