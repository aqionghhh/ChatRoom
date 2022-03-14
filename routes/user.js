const db = require('../model/User');
const User = db.model('User');


// 查询用户详情
module.exports = function (app) {
  app.post('/user/detail', (req, res) => {
    console.log('传进来的id', req.body.id);
    User.findOne({ _id: req.body.id }, (err, data) => {
      if (err) {
        console.log('出错了', err)
      }
      console.log('找到的data', data)
      res.send(data);  // 把查询到的用户信息传回去
    })
  }),

    // 修改用户信息
    app.post('/user/update', (req, res) => {
      let data = req.body.arr;
      // console.log('插入', data);

      User.findOneAndUpdate({ pwd: data.pwd }, { $set: data })
        .then(res => console.log('ok', res));
    })
}

