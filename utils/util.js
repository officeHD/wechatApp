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

//校验数据有效性
export const checkData = (str, text) => {
  if (text === '') {

    //非空验证
    wx.showModal({
      title: '提示',
      content: `${str} 不得为空！`,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
        reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        break;
      case str.indexOf('邮箱') >= 0:
        reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        break;
      case str.indexOf('卡单卡号') >= 0:
        reg = /^[a-zA-Z0-9]{12}$/;
        break;
      case str.indexOf('卡单密码') >= 0:
        reg = /^[a-zA-Z0-9]{6}$/;
        break;
      default:
        reg = /^\w+$/;
        break
    }
    if (!reg.test(text)) {
      wx.showModal({
        title: '提示',
        content: `${str} 格式不正确！`,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

      return false;
    }
    return true;
  }
}


module.exports = {
  formatTime: formatTime,
  checkData: checkData
}
