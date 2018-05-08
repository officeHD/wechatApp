var app = getApp();

Page({
  data: {
    index: 0,
    position: 'relative',
    active: 'runing',
    flag: true,
    listData: [],
    runing: [],
    stop: [],
    finish: []
  },
  onLoad: function () {
    let that = this;
    let UserName = app.globalData.UserName;
     
    if (!UserName) {
      wx.showModal({
        title: '提示',
        content: '登录失效，请重新登录',
      })
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return false;
    } else {
      that.setData({
        listData: app.globalData.runingData,
        runing: app.globalData.runingData,
        stop: app.globalData.stopData,
        finish: app.globalData.finishData,
      })
    }
  },
  searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    let data;
    if (target === "runing") {
      data = that.data.runing
    } else if (target === "stop") {
      data = that.data.stop;
    } else {
      data = that.data.finish
    }
    this.setData({
      active: target,
      listData: data
    })
  }
})