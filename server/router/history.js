const express = require('express')
const router = express.Router()
const db = require('../ultis/mysql.js')

// 获取历史消息记录
router.get('/getHistory', (req, res) => {
  const acc = req.auth.account
  const facc = req.query.facc * 1
  const date = req.query.date ? `${req.query.date}%` : '%'
  const number = req.query.number * 1
  let sqlStr = 'select * from msg where ((sender=? and receiver=?) or (sender=? and receiver=?)) and date like ? order by date'
  if (date === '%') {
    sqlStr += ` desc limit ${number + 10}`
  }
  db.query(sqlStr, [acc, facc, facc, acc, date], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    if (date === '%') {
      result = result.reverse()
    }

    for (let i = 0; i < result.length; i++) {
      if (result[i].sender === acc) {
        result[i] = {
          is_self: true,
          msg: result[i].msg,
          date: result[i].date,
          is_read: result[i].is_read
        }
      } else {
        result[i] = {
          is_self: false,
          msg: result[i].msg,
          date: result[i].date,
          is_read: 1
        }
      }
    }

    res.send({
      status: 200,
      result: result
    })
  })
})

module.exports = router
