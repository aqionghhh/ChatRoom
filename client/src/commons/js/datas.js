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
        id: 'b',    // 用户id，规定b是自己
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接）
        time: new Date() - 1000,    // 发送时间
        tip: 0
      },
      {
        id: 'a',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: require('../../static/images/img/two.jpg'),
        types: 1,   // 内容类型（0文字，1图片链接，2音频链接）
        time: new Date() - 1000 * 10,    // 发送时间
        tip: 1
      },
      {
        id: 'a',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接）
        time: new Date() - 1000 * 16,    // 发送时间
        tip: 2
      },
      {
        id: 'b',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接）
        time: new Date() - 1000 * 60,    // 发送时间
        tip: 3
      },
      {
        id: 'a',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接）
        time: new Date() - 1000 * 60 * 36,    // 发送时间
        tip: 4
      },
      {
        id: 'b',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接
        time: new Date() - 1000 * 60 * 50,    // 发送时间
        tip: 5
      },
      {
        id: 'b',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: require('../../static/images/img/two.jpg'),
        types: 1,   // 内容类型（0文字，1图片链接，2音频链接
        time: new Date() - 1000 * 60 * 1000,    // 发送时间
        tip: 6    // 类似消息的id
      },
      {
        id: 'a',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: require('../../static/images/img/one.jpg'),
        types: 1,
        time: new Date() - 1000 * 60 * 30000,    // 发送时间
        tip: 7    // 类似消息的id
      },
      {
        id: 'a',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接
        time: new Date() - 1000 * 60 * 600000,    // 发送时间
        tip: 8    // 类似消息的id
      },
      {
        id: 'b',    // 用户id
        imgurl: require('../../static/images/img/one.jpg'),
        message: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好',
        types: 0,   // 内容类型（0文字，1图片链接，2音频链接
        time: new Date() - 1000 * 60 * 600000,    // 发送时间
        tip: 9    // 类似消息的id
      },
    ]
    return msgs;
  }
}