var app = getApp();
Page({
  data: {
    array: ['美国', '中国', '巴西', '日本', '印度尼西亚'],
    index: 0,
    year: '2018',
    month: '09-01',
    Country: 'us',
    position: 'relative',
    page: '1',
    flag: true,
    type: '',
    ASIN: '',
    listData: []
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      type: options.type
    })
    let UserID = app.globalData.PKID;
    let cb = (res) => {
      let data = JSON.parse(res.data.d)
      console.log(JSON.parse(data.ReturnInfo))
      that.setData({
        listData: JSON.parse(data.ReturnInfo)
      });
    }
    let data = {
      UserID: UserID,
      PageType: that.data.type,
      Page: '1',
      PageCount: '10'
    }
    app.ajax('/GetGKSKSTKMHistoryTableInPage', data, cb)
  },
  changeASIN: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      ASIN: value
    })
  },
  checkboxChange: function (e) {
    let value = e.detail.value;
    this.setData({
      check: value
    })
  },
  search: function () {
    let that = this;
    let UserID = app.globalData.PKID

    let Country = that.data.Country;
    let ASIN = that.data.ASIN;
    if (!ASIN) {
      wx.showToast({
        title: '请输入ASIN',
        icon: "none"
      })
      return;
    }
    let cb = (res) => {
      let data = JSON.parse(res.data.d)
      that.setData({
        listData: JSON.parse(data.ReturnInfo)
      });
    }
    app.ajax('/GetGKSKSTKMHistoryTableInPageByAsin', { UserID: UserID, Country: Country, Asin: ASIN }, cb, 'POST')
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  //底部加载更多
  onReachBottom: function () {
    let that = this;
    that.setData({
      page: that.data.page - 0 + 1
    })
    let cb = (res) => {
      let data = JSON.parse(res.data.d)
      let newList = JSON.parse(data.ReturnInfo);
      that.setData({
        listData: that.data.listData.concat(newList)
      });
    }
    let data = {
      UserID: app.globalData.PKID,
      PageType: that.data.type,
      Page: that.data.page,
      PageCount: '10'
    }
    app.ajax('/GetGKSKSTKMHistoryTableInPage', data, cb)
  },
  onPageScroll: function (e) {
    let that = this;
    let scrollTop = e.scrollTop;

    if (scrollTop >= 60) {
      that.setData({
        position: 'fixed'
      });
    } else {
      that.setData({
        position: 'relative'
      });
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      month: e.detail.value
    })
  },
  bindYearChange: function (e) {
    this.setData({
      year: e.detail.value
    })
  },


  viewdetail: function (e) {
    wx.navigateTo({
      url: '/pages/webview/index?url=' + e.currentTarget.dataset.url,
    })
  }


})