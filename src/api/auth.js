import fly from '@/utils/request'

export function login (loginCode) {
  return fly.post('/auth/login/', {loginCode})
}
