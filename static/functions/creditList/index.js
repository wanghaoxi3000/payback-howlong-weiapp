/*
获取信用卡记录列表云函数
*/

// 云函数入口文件
const cloud = require('wx-server-sdk')

const { creditDetail } = require('./utils.js')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext()

  const {data} = await db.collection('credits').where({
    _openid: OPENID
  }).get()
  datetime = new Date()
  let detial = creditDetail(data[0], datetime)
  return {
    data,
    detial
  }
}