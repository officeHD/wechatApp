var app = getApp();
Page({
  data: {

    areas: ['美国', '英国', '德国', '法国'],
    arrayval: ['US', 'UK', 'DE', 'FR'],
    areasIndex: 0,
    Country: 'US',
    timerArr: ['3 Days', '7 Days', '15 Days', '30 Days', '60 Days', '120 Days'],
    timerval: ['3', '7', '15', '30', '60', '120'],
    timerIndex: 0,
    timer: '3',
    frequencyArr: ['6 mins', '15 mins', '30 mins', '1H', '3H', '6H', '12H', '24H'],
    frequencyval: ['6', '15', '30', '60', '180', '360', '720', '1440'],
    frequencyIndex: 0,
    frequency: '6',

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
  bindPickerChangeAreas: function (e) {
    let that = this;
    let index = e.detail.value;
    that.setData({
      areasIndex: index,
      Country: that.data.arrayval[index]
    })
  },
  bindPickerChangeTimer: function (e) {
    let that = this;
    let index = e.detail.value;
    that.setData({
      timerIndex: index,
      timer: that.data.timerval[index]
    })
  },
  bindPickerChangeFrequency: function (e) {
    let that = this;
    let index = e.detail.value;
    that.setData({
      frequencyIndex: index,
      frequency: that.data.frequencyval[index]
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
    
      if (data.State !== 1) {
        wx.showModal({
          title: '提示',
          content: data.ReturnInfo,
        })
      } else {
        that.goDetail();
      }
    }
    app.ajax('/AsinIsExists', { UserID: UserID, Country: Country, Asin: ASIN }, cb, 'POST')
  },
  goDetail: function () {
    wx.navigateTo({
      url: '/pages/search/KR/result/index',
    })
  }
})