import fly from '@/utils/request'

export function creditList () {
  return fly.get('/credits/')
}
