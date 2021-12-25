//群表
const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  userID: {//用户id
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {//群名称
    type: String,
  },
  imgurl: {//群头像
    type: String,
    default: 'group.png'//默认群头像
  },
  notice: {//群公告
    type: String,
  },
  time: {//群创建时间
    type: Date,
  },
});

module.exports = db.model('Group', GroupSchema);