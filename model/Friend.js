// 好友表
const mongoose = require('mongoose');
const db = require('../config/db');
const Schema = mongoose.Schema;

//创建好友表
const FriendSchema = new Schema({
  userID: {//用户id
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  friendID: {//好友id
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {//通过状态(0：已为好友，1申请中)
    type: String
  },
  time: {//生成时间
    type: Date,
    default: new Date()
  },
});


module.exports = db.model('Friend', FriendSchema);//暴露好友表