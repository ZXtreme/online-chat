const express = require('express')
const router = express.Router()
const db = require('../ultis/mysql.js')

// 添加好友
router.post('/addfriend', (req, res) => {
  let myAccount = req.auth.account
  let other = req.body.account * 1
  if (myAccount === other) {
    return res.send({
      status: 201,
      msg: '不能添加自己为好友'
    })
  }
  if (myAccount > other) {
    const t = myAccount
    myAccount = other
    other = t
  }
  const sqlStr = 'select * from friendship where acc=? and facc=?'
  db.query(sqlStr, [myAccount, other], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    if (result.length > 0) {
      return res.send({
        status: 201,
        msg: '已经添加为好友，不能重复添加'
      })
    }
    db.query('insert into friendship values(?,?,0,0)', [myAccount, other], (err, result) => {
      if (err) {
        return res.send({
          status: 500,
          msg: err.message
        })
      }
      res.send({
        status: 200,
        msg: '成功添加为好友'
      })
    })
  })
})

// 找符合特定条件的好友
router.get('/findfriend', (req, res) => {
  const input = `%${req.query.input}%`
  const sqlStr = 'select account,sign,picture,nickname from chat where account like ? or nickname like ?'
  db.query(sqlStr, [input, input], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    res.send({
      status: 200,
      msg: '查找成功',
      result: result
    })
  })
})

// 初始化好友列表
router.get('/initfriend', (req, res) => {
  const myAccount = req.auth.account
  const sqlStr1 = 'select account,sign,picture,nickname,online,ifnull(unread,0) unread,nearest,if (?<account,screenFirst,screenSecond) screen from (select account,sign,picture,nickname,online,screenFirst,screenSecond from friendship,chat where (?=acc and facc=account ) or (?=facc and acc=account)) as A left outer join (select sender,count(*) unread,max(date) nearest from msg where receiver=? and is_read=false group by sender) as B on (A.account=B.sender)'
  db.query(sqlStr1, [myAccount, myAccount, myAccount, myAccount], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    res.send({
      status: 200,
      msg: '查找成功',
      result: result
    })
  })
})

// 删除好友
router.post('/delfriend', (req, res) => {
  let myAccount = req.auth.account
  let other = req.body.account * 1
  if (myAccount > other) {
    const t = myAccount
    myAccount = other
    other = t
  }
  const sqlStr = 'delete from friendship where acc=? and facc=?'
  db.query(sqlStr, [myAccount, other], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    res.send({
      status: 200,
      msg: '已成功删除该好友'
    })
  })
})

// 屏蔽好友
router.post('/screen', (req, res) => {
  let myAccount = req.auth.account
  let other = req.body.other * 1
  const type = req.body.type * 1
  let sqlStr = 'update friendship set screenFirst=? where acc=? and facc=?'
  if (myAccount > other) {
    sqlStr = 'update friendship set screenSecond=? where acc=? and facc=?'
    const t = myAccount
    myAccount = other
    other = t
  }
  db.query(sqlStr, [type, myAccount, other], (err) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    res.send({
      status: 200,
      msg: '操作成功'
    })
  })
})

module.exports = router
