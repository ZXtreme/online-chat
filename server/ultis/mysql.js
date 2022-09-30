const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'ZRCzrc0808!',
  port: 3306,
  database: 'my_test_db'
})

module.exports = db
