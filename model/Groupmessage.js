//群消息表
const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;

const GroupmessageSchema = new Schema({
  groupID: {//群id
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
});

module.exports = db.model('Groupmessage', GroupmessageSchema);