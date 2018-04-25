// let API_HOST = "https://www.easy-mock.com/mock/5a9a2c2efdc65f3e22abbdaf/example";
var app = getApp();
// let API_HOST = "http://mp.surtime.com/SurtimeWebService.asmx";
let API_HOST = "http://mp.surtime.com/SurtimeWebService.asmx";

function ajax(url = '', data = {}, fn, ) {
  wx.request({
    url: API_HOST + url,
    method: 'POST',
    data: Object.assign({ "Key": "SurTimeWebserviceS3ur0ti1me8" }, data),
    header: { "Content-Type": "application/json" },
    success: function (res) {
      if (res.statusCode===500){
        wx.showToast({
          title: res.data.Message,
          icon:"none" 
        })
      }
      fn(res);
    },
    fail:function(error){
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