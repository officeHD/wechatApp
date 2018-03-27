let API_HOST = "https://www.easy-mock.com/mock/5a9a2c2efdc65f3e22abbdaf/example";
 
function ajax(url = '', data = '', fn, method = "get", header = {}) {
  wx.request({
    url: API_HOST + url,
    method: method ? method : 'get',
    data: data,
    header: header ? header : { "Content-Type": "application/json" },
    success: function (res) {
      fn(res);
    }
  });
}
module.exports = {
  ajax:ajax
}