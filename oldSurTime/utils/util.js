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
    wx.showToast({
      title: `${str} 不得为空！`,
      icon: 'none',
      mask: true,
      duration: 1500
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
      default:
        reg = /^\w+$/;
        break
    }
    if (!reg.test(text)) {
      wx.showToast({
        title: `${str} 格式不正确！`,
        icon: 'none',
        mask: true,
        duration: 1500
      })
      return false;
    }
    return true;
  }
}
//sort
const sort_object = (object, subkey, desc) => {
  var is_array = false;
  if (Object.prototype.toString.call(object) === '[object Array]') {
    is_array = true;
  }
  if (is_array) {
    var keys = { length: object.length };
  } else {
    if (typeof (Object.keys) == 'function') {
      var keys = Object.keys(object);
    } else {
      var keys = [];
      for (var key in keys) {
        keys.push(key);
      }
    }
  }
  for (var i = 0; i < keys.length; i++) {
    for (var j = i + 1; j < keys.length; j++) {
      if (is_array) {
        //数组排序
        if (Object.prototype.toString.call(subkey) === '[object Array]') {
          var vali = object[i];
          var valj = object[j];
          for (var si = 0; si < subkey.length; si++) {
            vali = vali[subkey[si]];
            valj = valj[subkey[si]];
          }
        } else {
          if ((!subkey && subkey !== '') || subkey == '' && object.sort) {
            var vali = object[i];
            var valj = object[j];
          } else {
            var vali = object[i][subkey];
            var valj = object[j][subkey];
          }
        }
        if (desc) {
          if (valj > vali) {
            var tmp = object[i];
            object[i] = object[j];
            object[j] = tmp;
          }
        } else {
          if (valj < vali) {
            var tmp = object[i];
            object[i] = object[j];
            object[j] = tmp;
          }
        }
      } else {
        //对象排序
        var obi = object[keys[i]];
        var obj = object[keys[j]];
        if (Object.prototype.toString.call(subkey) === '[object Array]') {
          var vali = obi;
          var valj = obj;
          for (var si = 0; si < subkey.length; si++) {
            vali = vali[subkey[si]];
            valj = valj[subkey[si]];
          }
        } else {
          if ((!subkey && subkey !== '') || subkey == '' && object.sort) {
            var vali = obi;
            var valj = obj;
          } else {
            var vali = obi[subkey];
            var valj = obj[subkey];
          }
        }
        if (desc) {
          if (valj > vali) {
            var tmp = keys[i];
            keys[i] = keys[j];
            keys[j] = tmp;
          }
        } else {
          if (valj < vali) {
            var tmp = keys[i];
            keys[i] = keys[j];
            keys[j] = tmp;
          }
        }
      }//is!array
    }
  }
  if (is_array) {
    return object;
  } else {
    var sorted = {};
    for (var i = 0; i < keys.length; i++) {
      sorted[keys[i]] = object[keys[i]];
    }
    return sorted;
  }
}
module.exports = {
  formatTime: formatTime,
  checkData: checkData,
  sort_object: sort_object
}
