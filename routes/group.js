const db = require('../model/Group');
const Group = db.model('Group');
const db2 = require('../model/Groupmessage');
const Groupmessage = db2.model('Groupmessage');
const db3 = require('../model/Groupmember');
const Groupmember = db3.model('Groupmember');
// 文件上传
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/userImg');
  },
  filename(req, file, cb) {
    let type = file.originalname.replace(/.+\./, '.');
    console.log('type', type);
    cb(null, Date.now() + type);
  }
})
const upload = multer({ storage: storage });


module.exports = function (app) {
  app.post('/group/createGroup', upload.single('file'), (req, res) => {
    console.log(req.file);
    console.log(req.body);

    Group.create({ name: req.body.groupName, master: req.body.groupMaster, imgurl: req.file.filename }).then(async created => {
      // res.send(created);
      console.log(created);
      let sp = req.body.user.split(',');
      console.log(sp);
      for (let i = 0; i < sp.length; i++) {
        Groupmember.create({ groupID: created._id, userID: sp[i] })
      }
      await res.send({ message: 'ok' });

    })
  }),

    //搜索所有群
    app.post('/group/search', (req, res) => {
      console.log(req.body);
      Group.find((err, data) => {
        res.send(data);
      })
    }),

    // 找有自己的群
    app.post('/group/find', async (req, res) => {
      let arr = []; // 用来存group的信息
      await Group.find({ master: req.body.id }).then(find => {
        if (find[0]) {
          arr = arr.concat(find);
        };
      });
      await Groupmember.find({ userID: req.body.id }).then(async member => {
        for (let i = 0; i < member.length; i++) {
          await Group.find({ _id: member[i].groupID }).then(group => {
            arr = arr.concat(group);
            console.log('groupinfo', arr);
          })
        }
        res.send(arr);
      });
    }),

    // 根据群id搜索群
    app.post('/group/match', (req, res) => {
      console.log('传进来的群id：', req.body);

      Group.findOne({ _id: req.body.id }).then(result => {
        res.send(result)
      })
    })
}