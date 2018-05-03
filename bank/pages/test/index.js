// pages/test/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(app.globalData.openId)
  },
  orderSign: function (e) {
    console.log(e);
    var fId = e.detail.formId;
    var fObj = e.detail.value;
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + App.globalData.wxData.token;
    var d = {
      touser: app.globalData.openId,
      template_id: 'dKyw9dIDjncWW3VuFIRK9o',//这个是1、申请的模板消息id，  
      page: '/pages/index/index',
      form_id: fId,
      value: {//测试完发现竟然value或者data都能成功收到模板消息发送成功通知，是bug还是故意？？【鄙视、鄙视、鄙视...】 下面的keyword*是你1、设置的模板消息的关键词变量  

        "keyword1": {
          "value": fObj.product,
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": fObj.detail,
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": new Date().getDate(),
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": "201612130909",
          "color": "#9b9b9b"
        },
        "keyword5": {
          "value": "$300",
          "color": "red"
        }
      },
      color: '#ccc',
      emphasis_keyword: 'keyword1.DATA'
    }
    wx.request({
      url: l,
      data: d,
      method: 'POST',
      success: function (res) {
        console.log("push msg");
        console.log(res);
      },
      fail: function (err) {
        // fail  
        console.log("push err")
        console.log(err);
      }
    });
  }
})