const db = require('../model/Friend');
const Friend = db.model('Friend');

module.exports = function (app) {
  // 查询好友相关
  app.post('/friend/search', (req, res) => {
    console.log('frined', req.body);
    // 查询跟本人相关的id
    Friend.find({ $or: [{ 'userID': req.body.id }, { 'friendID': req.body.id }] }).then(result => {
      console.log('以本人为user时查询的数据', result);
      res.send(result);
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

    // 同意加为好友
    app.post('/friend/agree', (req,res) => {
      console.log('同意请求', req.body);

      Friend.find()
    })
}