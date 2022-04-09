//群消息表
const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;

const GroupmessageSchema = new Schema({
  friendID: { //群id
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  userID: {//用户id(发送方id)
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {//内容
    type: String
  },
  types: {//内容类型(0：文字，1：图片链接，2：音频链接)
    type: String,
  },
  time: {//发送时间
    type: Date,
  },
  time2: {  // 如果是语音就存语音的秒数
    type: String,
  },
  imgurl: {// 用户头像
    type: String,
  },
  tip: {  // 未读消息数
    type: Number,
    default: 0,
  }
});

module.exports = db.model('Groupmessage', GroupmessageSchema);