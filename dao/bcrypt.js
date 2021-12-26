const bcrypt = require('bcryptjs');

//生成hash密码
exports.encryption = function (e) {//接收pwd
  //生成随机的salt
  let salt = bcrypt.genSaltSync(10);

  //生成hash密码
  let hash = bcrypt.hashSync(e, salt);

  return hash;
}

//解密
exports.verification = function (e, hash) {//把前端传进来的pwd和数据库中的hash进行匹配
  let verif = bcrypt.compareSync(e, hash);//进行对比

  return verif;//返回的是布尔值
}