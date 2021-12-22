const dbserver = require('../dao/dbserver');
module.exports = function (app) {
  app.get('/test', (req, res) => {
    dbserver.findUser(res)
  });

} 