//token

//引入token
const jwt = require('jsonwebtoken');

let secret = 'sxq';

//生成token
exports.generateToken = function (id) {
  let payload = { id: id, time: new Date() };
  let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 3 });   // 3小时，exp的单位是秒
  return token;
}

//解码token
exports.verifyToken = function (e) {
  let payload = jwt.verify(e, secret);
  return payload;
}