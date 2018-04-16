// pages/user/index.js
const app = getApp()
Page({
  data: {
    
    userList: [
    ]
  },
  onLoad: function () {
    let that = this;
    let fn = msg => {
      if (msg.data.result.toString() === "1") {
        that.setData({
          userList: msg.data.list
        })
      }
    }
    app.api("/getAssistance", { smallopenid: app.globalData.openId }, fn)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
    return {
      title: '浓情五月集花献礼，开福袋赢好礼',
      path: `/pages/index/index?openId=${app.globalData.openId}`,
      imageUrl: '/images/index/bg.png',
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})