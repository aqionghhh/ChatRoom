export default {
  friends: function () {
    let friendarr = [
      {
        id: 1,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '266718@qq.com',
        tip: 0,
        name: 'sxq',
        time: new Date(),
        message: '嘻',
      },
      {
        id: 2,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '266@qq.com',
        tip: 200,
        name: '呃呃',
        time: new Date(),
        message: '嘻嘻嘻',
      },
      {
        id: 3,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '2667183507@qq.com',
        tip: 12,
        name: '哈哈',
        time: new Date(),
        message: '嘻嘻嘻嘻嘻嘻嘻嘻嘻',
      },
      {
        id: 4,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '266718@qq.com',
        tip: 20,
        name: '不知道叫什么',
        time: new Date(),
        message: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻',
      },
      {
        id: 5,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '2@qq.com',
        tip: 2,
        name: 'sxq',
        time: new Date(),
        message: '嘻',
      },
      {
        id: 6,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '155@qq.com',
        tip: 0,
        name: '呃呃',
        time: new Date(),
        message: '嘻嘻嘻',
      },
      {
        id: 7,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '718@qq.com',
        tip: 12,
        name: '哈哈',
        time: new Date(),
        message: '嘻嘻嘻嘻嘻嘻嘻嘻嘻',
      },
      {
        id: 8,
        imgurl: require('../../static/images/img/one.jpg'),
        email: '266718@qq.com',
        tip: 20,
        name: '不知道叫什么',
        time: new Date(),
        message: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻',
      },
    ];
    return friendarr
  },
  //好友关系
  isFriend() {
    let isFriend = [
      {
        userid: 1,
        friend: 2,//对应上面friendarr数组的id
      },
      {
        userid: 1,
        friend: 5,
      },
      {
        userid: 1,
        friend: 6,
      },
      {
        userid: 1,
        friend: 8,
      },
    ]
    return isFriend;
  },

  message() {
    let msgs = [
      {
        id: '6235f67219a8d49ef56a49a3',    // 用户id，规定b是自己
        imgurl: require('../../static/images/img/one.jpg'),
        message: {
          voice: '6235f67219a8d49ef56a49a3',   // 音频
          time: 40      // 时长，单位是秒
        },
        types: '2',   // 内容类型（0文字，1图片链接，2音频链接）
        time: new Date(),    // 发送时间
        tip: 0
      }
    ]
    return msgs;
  }
}