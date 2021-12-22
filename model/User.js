const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

//创建用户表
const UserSchema = new Schema();

module.exports = db.model('User', UserSchema);//暴露用户表