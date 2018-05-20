// let API_HOST = "https://www.easy-mock.com/mock/5a9a2c2efdc65f3e22abbdaf/example";
 
let API_HOST = "http://192.168.0.106/SurtimeWebService.asmx";
// let API_HOST = "http://mp.surtime.com/SurtimeWebService.asmx";
 
function ajax(url = '', data = {}, fn) {
  // console.log(app.globalData.userData);
  let header = { "Content-Type": "application/json" };
  let app = getApp();
  
  if (app.globalData.userData){
    let token = JSON.parse(app.globalData.userData).Password;
    header = { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`}
  }
  wx.request({
    url: API_HOST + url,
    method: 'POST',
    data: Object.assign({ "Key": "SurTimeWebserviceS3ur0ti1me8" }, data),
    header: header,
    success: function (res) {
      if (res.statusCode === 500) {
        wx.showToast({
          title: res.data.Message,
          icon: "none"
        })
      }
      if(JSON.parse(res.data.d).State===0){
        wx.showToast({
          title: JSON.parse(res.data.d).ReturnInfo,
          icon: "none"
        })
        return false;
      }
      fn(res);
    },
    fail: function (error) {
      console.log(error)
    }
  });
}

//去空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
module.exports = {
  ajax: ajax,
  trim: trim
}