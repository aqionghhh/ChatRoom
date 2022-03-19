const db = require('../model/Friend');
const Friend = db.model('Friend');

module.exports = function (app) {
  // 查询好友相关
  app.post('/friend/search', (req, res) => {
    console.log('frined', req.body);

    Friend.find({ _id: req.body.id }, (err, data) => {
      console.log(data);
    })
  }),

    // 发送好友请求
    app.post('/friend/request', (req, res) => {
      console.log(req.body);
      let msg = { userID, friendID, state } = req.body
      Friend.insert({ msg }, (err, data) => {
        console.log(data);
      })
    })
}