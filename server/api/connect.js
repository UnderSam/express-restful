let Mysqli = require('mysqli');
let db_config = require('./db_config');
//传入json
let conn = new Mysqli({
  host: db_config.host, // IP/域名
  post: db_config.post, //端口， 默认 3306
  user: db_config.user, //用户名
  passwd:  db_config.passwd, //密码
  charset: '', // 数据库编码，默认 utf8 【可选】
  db: '' // 可指定数据库，也可以不指定 【可选】
})

module.exports = conn;