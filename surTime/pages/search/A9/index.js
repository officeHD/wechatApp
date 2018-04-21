var app = getApp();
Page({
  data: {
    array: ['美国', '中国', '巴西', '日本', '印度尼西亚'],
    index: 0,
    Country: 'us',
    flag: true,
    ASIN: '',
    OldData: '',
    listData: []
  },
  onLoad: function () {
    let that = this;
    let UserID = app.globalData.PKID;
    let cb = (res) => {

      let data = JSON.parse(res.data.d)
      console.log(JSON.parse(data.ReturnInfo))
      that.setData({
        listData: JSON.parse(data.ReturnInfo)
      });
    }
    app.ajax('/A9List', { UserID: UserID }, cb, 'POST')
  },
  //A9查询
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
      if (data.State.toString() === '1') {
        console.log(data);
      } else if (data.State.toString() === '4') {
        that.setData({
          OldData: data.ReturnInfo
        })
      } else if (data.State.toString() === '2') {

        wx.showToast({
          title: data.ReturnInfo,
          icon: 'none'
        })
        return false;
      } else {
        wx.showModal({
          title: '查询提示',
          content: '存在旧数据，是否重新查询',
        })
      }
      that.addAsin(UserID, Country, ASIN, that.data.OldData)

    }
    app.ajax('/AsinIsExists', { UserID: UserID, Country: Country, Asin: ASIN }, cb, 'POST')

  },
  // 增加A9查询信息
  addAsin: function (UserID, Country, ASIN, OldData) {
    let that = this;
    let cb = (res) => {
      let data = JSON.parse(res.data.d)
      wx.showToast({
        title: data.ReturnInfo,
        icon: 'none'
      })
      that.onLoad()
    }
    app.ajax('/AddAsin', { UserID: UserID, Country: Country, Asin: ASIN, OldData: OldData }, cb, 'POST')
  },
  /**
  * 下拉刷新
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  //加载更多
  onReachBottom: function () {
    let that = this;
    let cb = (res) => {
      that.setData({
        listData: that.data.listData.concat(res.data.list)
      });
    }
    app.ajax('/A9List', '', cb, 'POST')
  },
  changeASIN: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      ASIN: value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  }


})