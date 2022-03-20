const db = require('../model/Friend');
const Friend = db.model('Friend');

module.exports = function (app) {
  // 查询好友相关
  app.post('/friend/search', (req, res) => {
    console.log('frined', req.body);

    Friend.find({ _id: req.body.id }, (err, data) => {
      console.log(data);
      res.send(data);
    })
  }),

    // 发送好友请求
    app.post('/friend/request', (req, res) => {
      console.log(req.body);
      // 先进行搜索，如果有的话就不进行插入
      Friend.find({ userID: req.body.userID, friendID: req.body.friendID })
        .then(result => {
          console.log('result', result);
          if (result[0]) {   // 如果找到了，就返回一个状态
            res.send({ status: 501 });
          } else {  // 没有找到
            Friend.create(req.body).then(created => {
              res.send({ title: '创建成功' });
            })
          }
        })

    })
}