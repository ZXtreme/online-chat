const express = require('express')
const router = express.Router()
const db = require('../ultis/mysql.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secretKey = 'ZXtreme yyds!'

// 登录
router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const sqlStr = 'select * from chat where account = ?'
  db.query(sqlStr, username, (err, result) => {
    if (err) {
      res.send({
        status: 500,
        msg: err.message
      })
    } else if (result.length === 0) {
      res.send({
        status: 201,
        type: 1,
        msg: '账号不存在！'
      })
    } else {
      const isSame = bcrypt.compareSync(password, result[0].password)
      if (isSame) {
        const userinfo = { ...result[0], password: '' }
        const tokenStr = jwt.sign(userinfo, secretKey, { expiresIn: '12h' })
        res.send({
          status: 200,
          msg: '登录成功！',
          token: 'Bearer ' + tokenStr,
          result: userinfo
        })
      } else {
        res.send({
          status: 201,
          type: 2,
          msg: '密码错误!'
        })
      }
    }
  })
})

// 注册
router.post('/register', (req, res) => {
  const username = req.body.username
  let password = req.body.password
  password = bcrypt.hashSync(password, 10)
  db.query('select max(account) from chat', (err, result) => {
    if (err) {
      res.send({
        status: 500,
        msg: err.message
      })
      return
    }
    result = JSON.parse(JSON.stringify(result))
    let newAccount
    if (result[0]['max(account)'] === null) newAccount = '10000'
    else newAccount = result[0]['max(account)'] + 1
    db.query("insert into chat values(?,?,'','#icon-icon-test1',?)", [newAccount, password, username], (err, result) => {
      if (err) {
        res.send({
          status: 500,
          msg: err.message
        })
      } else {
        res.send({
          status: 200,
          msg: '注册成功！',
          account: newAccount
        })
      }
    })
  })
})

module.exports = router
