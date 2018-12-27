function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 日期格式化
export function parseTime (datetime) {
  let Y,
    M,
    D,
    W,
    H,
    Min,
    S
  let date = new Date(datetime)
  Y = date.getFullYear()
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  W = date.getDay()
  H = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
  Min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  switch (W) {
    case 1:
      W = '星期一'
      break
    case 2:
      W = '星期二'
      break
    case 3:
      W = '星期三'
      break
    case 4:
      W = '星期四'
      break
    case 5:
      W = '星期五'
      break
    case 6:
      W = '星期六'
      break
    case 7:
      W = '星期天'
      break
  }
  const time = {
    ymd: Y.toString() + '年' + M.toString() + '月' + D + '日',
    week: W,
    hour: H.toString() + ':' + Min.toString(),
    sec: ':' + S.toString()
  }

  return time
}

export default {
  formatNumber,
  formatTime,
  parseTime
}
