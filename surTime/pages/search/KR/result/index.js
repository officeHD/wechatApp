var app = getApp();

Page({
  data: {
    index: 0,
    position: 'relative',
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
    }
  
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    this.setData({
      recordType: target
    })
    if (target === "consume") {
      that.GetOperationLis()
    } else {
      that.GetRechargeList()
    }
  },
  GetRechargeList: function () {
    let that = this;
    let cb = (res) => {
      wx.hideLoading()
      let result = JSON.parse(res.data.d);
      if (result.State.toString() === "1") {
        that.setData({
          listData: JSON.parse(result.ReturnInfo)
        });
      }
    }
    wx.showLoading({
      title: '加载中',
    })
    app.ajax('/GetRechargeListByUser', { UserName: app.globalData.UserName }, cb)
  }
  

})