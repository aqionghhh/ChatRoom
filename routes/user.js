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
      console.log('插入', data);

      User.findOneAndUpdate({ pwd: data.pwd }, { $set: data }, (err, data) => {
        console.log('ok', data)
        res.send(data);  // 把查询到的用户信息传回去
      })
    }),

    // 搜索响应的用户
    app.post('/user/search', (req, res) => {
      console.log(req.body);
      // 返回除了自身的所有数据
      User.find((err, data) => {
        console.log('查找用户', data);
        for (let i = 0; i < data.length; i++) {
          if (req.body.id == data[i]._id) {
            data.pop(data[i]);
          }
        }
        res.send(data);
      })

    })
}

