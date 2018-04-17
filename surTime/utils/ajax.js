// let API_HOST = "https://www.easy-mock.com/mock/5a9a2c2efdc65f3e22abbdaf/example";
var app = getApp();
let API_HOST = "http://mp.surtime.com/SurtimeWebService.asmx";

function ajax(url = '', data = {}, fn, ) {
  wx.request({
    url: API_HOST + url,
    method: 'POST',
    data: Object.assign({ "Key": "SurTimeWebserviceS3ur0ti1me8" }, data),
    header: { "Content-Type": "application/json" },
    success: function (res) {
      fn(res);
    }
  });
}
// 存储用户信息
function initUserInfo(obj) {
  app.globalData.PKID = obj.PKID;
  app.globalData.Email = obj.Email;
  app.globalData.IsAdmin = obj.IsAdmin;
  app.globalData.Tel = obj.Tel;
  app.globalData.UserName = obj.UserName;
  wx.setStorage({
    key: "PKID",
    data: obj.PKID
  })
  wx.setStorage({
    key: "Email",
    data: obj.Email
  })

  wx.setStorage({
    key: "IsAdmin",
    data: obj.IsAdmin
  })
  wx.setStorage({
    key: "Tel",
    data: obj.Tel
  })
  wx.setStorage({
    key: "UserName",
    data: obj.UserName
  })

}
//去空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
module.exports = {
  ajax: ajax,
  initUserInfo: initUserInfo,
  trim: trim
}