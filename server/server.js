const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const app = express()
const server = http.createServer(app)
const cors = require('cors')
const { expressjwt } = require('express-jwt')
const db = require('./ultis/mysql.js')
const Mint = require('mint-filter').default

// 托管静态资源
app.use('/head', express.static('head-images'))
app.use('/expression', express.static('expression-images'))

const secretKey = 'ZXtreme yyds!'
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^(\/login|\/register|\/head|\/expression)/] }))

// 导入修改个人信息的路由
const alterself = require('./router/alterself.js')
app.use(alterself)

// 导入好友管理的路由
const friend = require('./router/friend.js')
app.use(friend)

// 导入登录和注册的路由
const loginRegister = require('./router/login-register.js')
app.use(loginRegister)

// 导入获取消息记录的路由
const history = require('./router/history.js')
app.use(history)

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
})

// 使用正则过滤黄暴信息
// const filterWorseMessage = /[黄暴]/g
// message.msg = message.msg.replace(filterWorseMessage, '**')
// 或使用效率更高的Aho–Corasick算法
// 此处缺乏敏感词数据
const mint = new Mint(['fuck', '黄', '暴'])

io.on('connection', (socket) => {
  // 接收并转发消息
  socket.on('message', (message) => {
    let sender = message.sender; let receiver = message.receiver
    let sql = 'select screenFirst from friendship where acc=? and facc=?'
    if (sender < receiver) {
      sql = 'select screenSecond from friendship where acc=? and facc=?'
      const t = sender
      sender = receiver
      receiver = t
    }
    db.query(sql, [receiver, sender], (err, result) => {
      if (err) return
      const status = result[0].screenFirst || result[0].screenSecond
      message.msg = mint.filterSync(message.msg, { replace: true }).text
      const sqlStr = 'insert into msg values(?,?,?,?,?)'
      db.query(sqlStr, [message.sender, message.receiver, message.msg, message.date, message.is_read])
      message.status = status
      io.emit('message', message)
    })
  })

  // 修改消息未读状态
  socket.on('turnToRead', (obj) => {
    const sqlStr = 'update msg set is_read=true where sender=? and receiver=?'
    db.query(sqlStr, [obj.writer, obj.reader])
    io.emit('turnToRead', obj)
  })
})

// 修改在线状态
app.post('/changeOnline', (req, res) => {
  const account = req.auth.account
  const cond = req.body.cond * 1
  const sqlStr = 'update chat set online=? where account=?'
  db.query(sqlStr, [cond, account])
  io.emit('changeOnline', account, cond)
})

server.listen(24000, () => {
  console.log('server is up and running on port 24000')
})
