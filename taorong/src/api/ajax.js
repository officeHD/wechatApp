'use strict';
/**
 * 函数：将普通js对象转换成表单参数字符串
 * 输入：
 * 输出：
**/
function objToParams (obj) {
  var list = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      list.push(key + '=' + obj[key]);
    }
  }
  return list.join('&');
}

var zAJAX = function (url, datas, func,type="post") {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(type, url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(objToParams(datas));

  var t1 = setTimeout(function() {
    func({result: 0, message: '请求超时，请稍后重试！'});
    xmlhttp.abort();
  },30000);
  
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      clearTimeout(t1)
      func(JSON.parse(xmlhttp.responseText));
    }
  }
}

module.exports = zAJAX;

 