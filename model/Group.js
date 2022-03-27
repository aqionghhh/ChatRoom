//群表
const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {//群名称
    type: String,
  },
  master: { // 群主
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imgurl: {//群头像
    type: String,
  },
  tip: {//群主的未读消息数
    type: Number,
    default: 0
  },
  notice: {//群公告
    type: String,
    default: '',
  },
  time: {//群创建时间
    type: Date,
    default: new Date(),
  },
});

module.exports = db.model('Group', GroupSchema);