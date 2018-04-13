// pages/gift/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geturl: '',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let fn = msg => {
      if (msg.data.result.toString() === "1") {
        let geturl = msg.data.getUrl;
        that.setData({
          geturl: geturl
        })
      }
    }
    app.api("/getUrl", {}, fn)
  },

  lottery: function () {

    let url = this.data.geturl;
    wx.navigateTo({
      url: '/pages/webview/index?url=' + encodeURIComponent(this.data.geturl)
    })
    // let fn=msg=>{
    //   console.log(msg)
    // }
    // app.api("/openhongbao", {}, fn)
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})