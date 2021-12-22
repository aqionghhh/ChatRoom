const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:27017/chat');

db.on('error', console.error.bind(console, '数据库连接失败'));//连接失败提醒
db.once('open', function () {
  console.info('数据库连接成功');
})

module.exports = db;