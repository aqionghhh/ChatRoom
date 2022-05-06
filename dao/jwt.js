//token

//引入token
const jwt = require('jsonwebtoken');

let secret = 'sxq';

//生成token
exports.generateToken = function (id) {
  let payload = { id: id, time: new Date() };
  let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });   // exp的单位是秒
  return token;
}

//解码token
exports.verifyToken = function (e) {

  return new Promise((resolve, reject) => {
    jwt.verify(e, secret, (err, result) => {

      if (err) {
        reject(err)
      } else {
        console.log(result);
        resolve(result)
      }
    })
  })
}