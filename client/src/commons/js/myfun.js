import { now } from "mongoose";

export default {
  //首页时间转换
  dateTime(d) {//接收一个传入的时间
    //把存进来的时间和现在的时间做对比
    let old = new Date(d);//存进来的时间
    let now = new Date();//现在的时间

    //获取old具体时间
    let oh = old.getHours();//小时
    let om = old.getMinutes();//分钟
    let oY = old.getFullYear();//年
    let oM = old.getMonth() + 1;//月//因为月份会自动减一，所以需要手动加一
    let oD = old.getDate();//日
    //获取now具体时间
    let nY = now.getFullYear();//年
    let nM = now.getMonth() + 1;//月
    let nD = now.getDate();//日

    //当天时间
    if (oD === nD && oY === nY && oM === nM) {
      if (oh < 10) {
        oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
      }
      if (om < 10) {
        om = '0' + om;//如果分钟数小于10，则在其前面加一个0
      }
      return oh + ':' + om;
    }

    //昨天时间
    if (oD + 1 === nD && oY === nY && oM === nM) {
      if (oh < 10) {
        oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
      }
      if (om < 10) {
        om = '0' + om;//如果小时数小于10，则在其前面加一个0
      }
      return '昨天' + oh + ':' + om;
    }
    if (oM === nM) {
      return oM + '/' + oD;
    } else {
      return oY + '/' + oM + '/' + oD;
    }
  },

  //详细时间转换
  // detailTime(d) {//接收一个传入的时间
  //   //把存进来的时间和现在的时间做对比
  //   let old = new Date(d);//存进来的时间

  //   //获取old具体时间
  //   // let od = old.getTime();//
  //   let h = old.getHours();//小时
  //   let m = old.getMinutes();//分钟
  //   let Y = old.getFullYear();//年
  //   let M = old.getMonth() + 1;//月//因为月份会自动减一，所以需要手动加一
  //   let D = old.getDate();//日

  //   //处理时间
  //   if (M < 10) {
  //     M = '0' + M;//如果月份小于10，则在其前面加一个0
  //   }
  //   if (D < 10) {
  //     D = '0' + D;//如果日期小于10，则在其前面加一个0
  //   }
  //   if (h < 0) {
  //     oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
  //   }
  //   if (m < 0) {
  //     om = '0' + om;//如果小时数小于10，则在其前面加一个0
  //   }
  //   return Y + '-' + M + '-' + D + ' ' + h + ':' + m

  // },


  // 聊天室里的时间
  dateTime1(d) {//接收一个传入的时间
    //把存进来的时间和现在的时间做对比
    let old = new Date(d);//存进来的时间
    let now = new Date();//现在的时间

    //获取old具体时间
    // let od = old.getTime();//
    let oh = old.getHours();//小时
    let om = old.getMinutes();//分钟
    let oY = old.getFullYear();//年
    let oM = old.getMonth() + 1;//月//因为月份会自动减一，所以需要手动加一
    let oD = old.getDate();//日
    //获取now具体时间
    // let nd = now.getTime();//
    // let nh = now.getHours();//小时
    // let nm = now.getMinutes();//分钟
    let nY = now.getFullYear();//年
    // let nM = now.getMonth()+1;//月
    let nD = now.getDate();//日

    //当天时间
    if (oD === nD && oY === nY && oY === nY) {
      if (oh < 0) {
        oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
      }
      if (om < 0) {
        om = '0' + om;//如果小时数小于10，则在其前面加一个0
      }
      return oh + ':' + om;
    }

    //前天时间
    if (oD + 1 === nD && oY === nY && oY === nY) {
      if (oh < 0) {
        oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
      }
      if (om < 0) {
        om = '0' + om;//如果小时数小于10，则在其前面加一个0
      }
      return '前天' + oh + ':' + om;
    }

    ///大于两天
    else if (oY === nY) {
      // 今年
      if (oh < 0) {
        oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
      }
      if (om < 0) {
        om = '0' + om;//如果小时数小于10，则在其前面加一个0
      }
      return oM + '月' + oD + '日' + ' ' + oh + ':' + om
    } else {
      // 大于今年
      if (oh < 0) {
        oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
      }
      if (om < 0) {
        om = '0' + om;//如果小时数小于10，则在其前面加一个0
      }
      return oY + '年' + oM + '月' + oD + '日';

    }
  },

  // 间隔时间差
  spaceTime(old, now) { // 拿前后两个时间差进行对比
    old = new Date(old);
    now = new Date(now);

    let told = old.getTime();
    let tnow = now.getTime();

    // 为什么要用以前的时间-现在的时间：因为当前获取的数据是倒叙插入的
    if (told > (tnow + 1000 * 60 * 5)) {  // 后面一个时间大于前面一个时间5分钟
      return now;
    } else {
      return '';
    }

  }

}