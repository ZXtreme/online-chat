const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../ultis/mysql.js')
const jwt = require('jsonwebtoken')

// 配置multer磁盘存储
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '/head-images'))
  },
  filename: function(req, file, cb) {
    const idx = file.originalname.lastIndexOf('.')
    file.originalname = req.auth.account + file.originalname.substring(idx)
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

const secretKey = 'ZXtreme yyds!'

// 修改个人信息
router.post('/alterself', upload.single('head'), (req, res) => {
  const account = req.auth.account
  let { nickname, sign, picture } = req.body
  if (req.file) picture = req.file.originalname
  const sqlStr = 'update chat set sign=?,picture=?,nickname=? where account=?'
  db.query(sqlStr, [sign, picture, nickname, account], (err, result) => {
    if (err) {
      return res.send({
        status: 500,
        msg: err.message
      })
    }
    const tokenStr = jwt.sign({ account, sign, picture, nickname }, secretKey, { expiresIn: '12h' })
    res.send({
      status: 200,
      msg: '成功',
      token: 'Bearer ' + tokenStr,
      pic: picture
    })
  })
})

module.exports = router
