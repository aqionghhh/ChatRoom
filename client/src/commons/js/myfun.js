export default {
  //首页时间转换
  dateTime(d) {//接收一个传入的时间
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
    else {
      return oY + '/' + oM + '/' + oD
    }
  },

  //详细时间转换
  detailTime(d) {//接收一个传入的时间
    //把存进来的时间和现在的时间做对比
    let old = new Date(d);//存进来的时间

    //获取old具体时间
    // let od = old.getTime();//
    let h = old.getHours();//小时
    let m = old.getMinutes();//分钟
    let Y = old.getFullYear();//年
    let M = old.getMonth() + 1;//月//因为月份会自动减一，所以需要手动加一
    let D = old.getDate();//日

    //处理时间
    if (M < 10) {
      M = '0' + M;//如果月份小于10，则在其前面加一个0
    }
    if (D < 10) {
      D = '0' + D;//如果日期小于10，则在其前面加一个0
    }
    if (h < 0) {
      oh = '0' + oh;//如果小时数小于10，则在其前面加一个0
    }
    if (m < 0) {
      om = '0' + om;//如果小时数小于10，则在其前面加一个0
    }
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m

  }
}