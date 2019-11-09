/*
工具函数文件
*/
const moment = require('moment');

// 计算指定时间下的信用卡信息
function creditDetail(card, timeinfo) {
  let billDate = new Date(timeinfo) // 指定时间下一账单日

  // billDay > 28 表示账单日为每月最后一天
  if (card.billDay > 28) {

    billDate.setMonth(billDate.getMonth() + 1)
    billDate.setDate(0)
  }
  // billDay 账单日为每月固定的一天
  else {
    // 检查本月账单日是否已过
    if (billDate.getDate() < card.billDay) {
      billDate.setDate(card.billDay)
    } else {
      billDate.setMonth(billDate.getMonth() + 1)
      billDate.setDate(card.billDay)
    }
  }

  let payDate // 指定时间下一还款日
  let curPayDate = new Date(billDate.getTime()) // 指定时间消费还款日
  let waitDay = new Date(billDate.getTime()) // 最长等待时间

  waitDay.setMonth(waitDay.getMonth() + 1)

  // 还款日为下个月固定的某一天
  if (card.payFix) {
    payDate = new Date(timeinfo)
    waitDay.setMonth(waitDay.getMonth() + 1)
    waitDay.setDate(card.payDay)

    // 检查本月还款日是否已过
    if (payDate.getDate() < card.payDay) {
      payDate.setDate(card.payDay)
    } else {
      payDate.setMonth(payDate.getMonth() + 1)
      payDate.setDate(card.payDay)
    }

    curPayDate.setMonth(curPayDate.getMonth() + 1)
    curPayDate.setDate(card.payDay)
  }
  // 还款日为账单日指定天数的某一天
  else {
    payDate = new Date(billDate.getTime())
    payDate.setMonth(payDate.getMonth() - 1)
    let timeDur = card.payDay * 24 * 60 * 60 * 1000

    waitDay.setTime(waitDay.getTime() + timeDur)

    // 检查还款日是否已超过指定的时间
    if (timeinfo.getTime() < (payDate.getTime() + timeDur)) {
      payDate.setTime(payDate.getTime() + timeDur)
    } else {
      payDate.setTime(billDate.getTime() + timeDur)
    }

    curPayDate.setTime(curPayDate.getTime() + timeDur)
  }

  return {
    nextBill: moment(billDate).format('YYYY-MM-DD')
  }
}

module.exports = {
  creditDetail
}