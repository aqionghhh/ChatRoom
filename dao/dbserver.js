// const db = require('../model/Friend');
// const Friend = db.model('Friend');
const db = require('../model/User');
const User = db.model('User');


exports.findUser = (res) => {
  User.find((err, val) => {
    if (err) {
      console.log('用户数据查找失败' + err);
    } else {
      res.send(val)
      // console.log('11')
    }
  })
}