let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require('mock.js')
function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'staffid': /\d{8}/,//staffid
      'data|5': [{

        'id|+1': 1,
        'name':'@cname()',
        'img': "sale2.png",
        'icon': "@image('50x50', '#4A7BF7','#fff','icon')",
        'title': '@ctitle(3,12)',
        'descript': '@ctitle(15,20)',
        'city': "@county(true)",
        'stock_num': '@integer(0,1000)',//库存数量  
        'status': '@pick(付款信息不完整,已入司,审核失败,申请成功)',
        'position': '@pick(分部经理,分部副经理,客户经理)',
        'date_time': '@datetime()',
        'marketing_stop': '@now()',
        'price': '@integer(100,2000)',//现价，单位：分  
        'original_price': '@integer(100,3000)'
      }

      ]
    })

    fn(res);
  }
}
module.exports = {
  ajax: ajax
}