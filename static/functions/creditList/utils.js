/*
工具函数文件
*/
const moment = require('moment')

/*
 计算指定日期的信用卡信息
 card 信用卡信息对象
 timeinfo 指定时间的 date 对象
*/
function creditDetail (card, datetime) {
  let billDate = moment(datetime) // 当前账单日

  // billDay > 28 时账单日为每月最后一天
  if (card.billDay > 28) {
    billDate.endOf('month')
  }
  // billDay 账单日为每月固定的一天
  else {
    billDate.date(card.billDay)
    // 若账单日是否已过
    if (datetime.getDate() > card.billDay) {
      billDate.add(1, 'months')
    }
  }

  let payDate // 当前还款日
  let curPayDate = moment(billDate) // 当前消费还款日
  let waitDay // 最长等待时间

  // 还款日为下个月固定的某一天
  if (card.payFix) {
    payDate = moment(datetime)
    payDate.date(card.payDay)

    // 若还款日是否已过
    if (datetime.getDate() > card.payDay) {
      payDate.add(1, 'months')
    }

    curPayDate.add(1, 'months').date(card.payDay)
    waitDay = moment.duration(2, 'months').add(card.payDay - billDate.date(), 'days')
  }
  // 还款日为账单日指定天数的某一天
  else {
    payDate = moment(billDate)
    payDate.subtract(1, 'months').add(card.payDay, 'days')

    // 还款日是否已超过指定的时间
    if (payDate.isBefore(moment(datetime))) {
      payDate = moment(billDate)
      payDate.add(card.payDay, 'days')
    }

    curPayDate.add(card.payDay, 'days')
    waitDay = moment.duration({
      month: 1,
      days: card.payDay
    })
  }

  return {
    nextBill: billDate.format('YYYY-MM-DD'),
    nextPay: payDate.format('YYYY-MM-DD'),
    curPay: curPayDate.format('YYYY-MM-DD'),
    waitDay: waitDay.asDays(),
    intervalBill: billDate.diff(datetime, 'days'), // 下一账账单日间隔
    intervalPay: payDate.diff(datetime, 'days'), // 下一账还款日间隔
    intervalCurPay: curPayDate.diff(datetime, 'days') // 当日消费还款日间隔
  }
}

module.exports = {
  creditDetail
}
