const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
let API_HOST = "https://huodong.taoronge.com/bank";
// let API_HOST = "http://192.168.1.14:8080/bank";
// let API_HOST = "https://www.easy-mock.com/mock/5a9a2c2efdc65f3e22abbdaf/example";

const ajax = (url = '', data = '', fn) => {
  wx.request({
    url: API_HOST + url,
    method: "GET",
    data: data,
    header: { "Content-Type": "application/json" },
    success: function (res) {
      fn(res);
    }
  });
}
//校验数据有效性
const checkData = (str, text) => {
  if (text === '') {
    //非空验证
    wx.showToast({
      title: `${str} 不得为空！`,
      icon: 'none',
      duration: 2000
    })
    return false
  } else {

    //格式验证
    let reg;
    switch (true) {
      case str.indexOf('姓名') >= 0:
        reg = /^[\u4e00-\u9fa5]{2,10}$/;
        break;
      case str.indexOf('证件号码') >= 0:
      case str.indexOf('身份证') >= 0:
        reg = /(^[1-9]\d{5}[1-2]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|X|x)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/;
        break;

      case str.indexOf('日期') >= 0:
        reg = /^[1-2]\d{3}-[0-1]\d-[0-3]\d$/;
        break;
      case str.indexOf('电话') >= 0:
      case str.indexOf('手机') >= 0:
        reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        break;
      case str.indexOf('邮箱') >= 0:
        reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        break;
      case str.indexOf('邮政编码') >= 0:
        reg = /^[1-9][0-9]{5}$/;
        break;
      case str.indexOf('详细住址') >= 0:
        reg = /^\S*([\u4E00-\u9FA5].*[0-9])|([0-9].*[\u4E00-\u9FA5])\S*$/;
        break;
      default:
        reg = /^\w+$/;
        break
    }
    if (!reg.test(text)) {
      let mes =" 格式不正确！";
      if (str ==="详细住址"){
        mes="具体到门牌号"
      }
      wx.showToast({
        title: `${str} ${mes} `,
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    return true;
  }
}
const saveUserInfo=(msg)=>{
  app.globalData.msg=msg
}
module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  saveUserInfo: saveUserInfo,
  checkData: checkData
}
