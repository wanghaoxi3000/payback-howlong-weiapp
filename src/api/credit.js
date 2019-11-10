const db = wx.cloud.database()

export function creditList () {
  return wx.cloud.callFunction({name: 'creditList'})
}

export async function addCredit (data) {
  let res = await db.collection('credits').count()
  if (res.total > 60) {
    return Promise.reject(new Error('最多创建 60 条'))
  }

  const { name, billDay, payDay, payFix } = data

  res = await db.collection('credits').where({name}).count()
  if (res.total > 0) {
    return Promise.reject(new Error(`${name} 已存在`))
  }

  return db.collection('credits').add({
    data: {
      name,
      billDay,
      payDay,
      payFix,
      createAt: db.serverDate(),
      updateAt: db.serverDate()
    }
  })
}

export function deleteCredit (id) {
  return db.collection('credits').doc(id).remove()
}

export async function editCredit (data) {
  const { name, billDay, payDay, payFix } = data

  const res = await db.collection('credits').where({
    _id: db.command.neq(data._id),
    name
  }).count()
  if (res.total > 0) {
    return Promise.reject(new Error(`${name} 已存在`))
  }

  return db.collection('credits').doc(data._id).update({
    data: {
      name,
      billDay,
      payDay,
      payFix,
      updateAt: db.serverDate()
    }
  })
}
