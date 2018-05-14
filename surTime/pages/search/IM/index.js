var app = getApp();
Page({
  data: {

    areas: ['美国', '英国', '德国', '法国', '加拿大', '墨西哥', '日本', '西班牙', '意大利'],
    arrayval: ['US', 'UK', 'DE', 'FR', 'CA', 'MX', 'JP', 'ES', 'IT'],
    areasIndex: 0,
    timer: ['3 Days', '7 Days', '15 Days', '30 Days', '60 Days', '120 Days'],
    timerval: ['3', '7', '15', '30', '60', '120'],
    timerIndex: 0,
    year: '2018',
    month: '09-01',
    Country: 'us',
    position: 'relative',
    flag: true,
    ASIN: '',
    listData: []
  },
  onLoad: function () {
    let that = this;
    let UserID = app.globalData.PKID;



  },
  changeASIN: function (e) {
    let value = e.detail.value;
    let that = this;

    that.setData({
      ASIN: value
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
    app.ajax('/AsinIsExists', { UserID: UserID, Country: Country, Asin: ASIN }, cb, 'POST')
  },
  sortArr: function (e) {
    let target = e.currentTarget.dataset.target;
    let that = this;
    let arr = that.data.listData;
    let flag = !that.data.flag;
    that.setData({
      flag: flag,
      listData: app.sort_object(arr, target, flag)
    });

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

  onReachBottom: function () {
    let that = this;
    let cb = (res) => {
      that.setData({
        listData: that.data.listData.concat(res.data.list)
      });
    }
    app.ajax('A9List', '', cb, 'POST')
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
  }
,
  goDetail:function(){
    wx.navigateTo({
      url: './detail/index',
    })
  }
})