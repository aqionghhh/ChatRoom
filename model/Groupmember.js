//群成员表
const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;

const GroupmemberSchema = new Schema({
  groupID: {//群id
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  userID: {//用户id
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tip: {//未读消息数
    type: Number,
    default: 0
  },
  time: {//加入时间
    type: Date,
    default: new Date(),
  },
  state: {// 当前加群的状态
    type: String,
    default: '1'  // 默认没有通过（0：通过，1：没有通过）
  },
  message: {  // 加群的信息
    type: String,
  }
});

module.exports = db.model('Groupmember', GroupmemberSchema);