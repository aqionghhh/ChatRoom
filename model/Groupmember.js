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
  name: {//群内名称
    type: String
  },
  tip: {//未读消息数
    type: Number,
    default: 0
  },
  time: {//加入时间
    type: Date,
  },
  shield: {//是否屏蔽群消息(0不屏蔽，1屏蔽)
    type: Number
  },
});

module.exports = db.model('Groupmember', GroupmemberSchema);