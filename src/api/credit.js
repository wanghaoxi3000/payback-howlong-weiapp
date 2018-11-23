import fly from '@/utils/request'

export function creditList () {
  return fly.get('/credits/')
}

export function addCredit (data) {
  return fly.post('/credits/', data)
}

export function deleteCredit (id) {
  return fly.delete(`/credits/${id}/`)
}

export function editCredit (data) {
  return fly.put(`/credits/${data.id}/`, data)
}
