var app = getApp();

Page({
  data: {
    recordType: 'recharge',
    index: 0,
    position: 'relative',
    flag: true,
    imgurl: [
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 1
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 2
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 3
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 4
      },
      {
        src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        type: 5
      }

    ],
    listData: [],
    consumeList: []
  },
  onLoad: function () {

  },
  onShow: function () {
    let that = this;
    let UserName = app.globalData.UserName;
    if (!UserName) {
      wx.showModal({
        title: '提示',
        content: '登录失效，请重新登录',
        complete: function () {
          wx.navigateTo({
            url: '/pages/login/index',
          })
        }
      })

      return false;
    }
    this.GetRechargeList()
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
  },
  GetOperationLis: function () {
    let that = this;
    let cb = (res) => {
      wx.hideLoading()
      let result = JSON.parse(res.data.d);
      if (result.State.toString() === "1") {

        that.setData({
          consumeList: JSON.parse(result.ReturnInfo)
        });
      }
      // console.log(result)
    }
    wx.showLoading({
      title: '加载中',
    })
    app.ajax('/GetOperationListByuser', { UserName: app.globalData.UserName }, cb)
  },
  payOrder: function (e) {

    wx.navigateTo({
      url: `/pages/pay/index?type=${e.currentTarget.dataset.type}`,
    })
  }

})