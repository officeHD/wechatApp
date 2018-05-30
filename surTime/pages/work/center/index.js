// pages/workCenter/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userData = JSON.parse(app.globalData.userData);
    app.ajax("/TaskInfoList", { UserID: userData.PKID }, function (res) {
      let msg = JSON.parse(res.data.d)
      console.log(JSON.parse(msg.ReturnInfo));
      if (msg.State.toString() === "1") {
        that.setData({
          listData: JSON.parse(msg.ReturnInfo)
        })
      }
    })
  },

  goDetail: function (e) {
    if (e.currentTarget.dataset.pkid.toString()==='1'){
      wx.showModal({
        title: '提示',
        content: '暂不可用',
       
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/work/add/index?type=' + e.currentTarget.dataset.pkid,
    })
  },
  //做任务是否可获得奖励提醒信息
  GetInfoString: function () {
    app.ajax("/TaskInfoList", data, fn)
  }
})