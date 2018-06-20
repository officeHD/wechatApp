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
    check1:false,
    flag: true,
    ASIN: '',
    listData: []
  },
  onLoad: function () {
    let that = this;
    let UserID = app.globalData.PKID;



  },
  changePlanName: function (e) {
    let value = e.detail.value;
    let that = this;

    that.setData({
      planName: value
    })
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
  checkboxChange1: function (e) {
    this.setData({
      check1: !this.data.check1
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
    let sendData = {
      UserID: UserID,
      Country: Country,

      PlanName: that.data.planName,
      KeyWord: ASIN,
      MonitoringCycleDay: that.data.timer,
      MonitoringFrequency: that.data.frequency,
      IsCreateRuning: that.data.check1,
      UserIPAddress: '',
      RuningPage: 1,
      StopPage: 1,
      CompletePage: 1,
      PageCount: 20
    }
    let cb = (res) => {
      wx.hideLoading();
      let data = JSON.parse(res.data.d)
      let fn = msg => {

        let ret = JSON.parse(msg.data.d);
        app.initUserInfo(JSON.parse(ret.ReturnInfo));
        app.initUserData(ret.ReturnInfo);
      }
      app.ajax('/GetUserInfo', { Openid: app.globalData.openId }, fn)
      if (data.State !== 1) {
        wx.showModal({
          title: '提示',
          content: data.ReturnInfo,
        })
      } else {
        that.goDetail();
      }

    }
    wx.showLoading({
      title: '创建中',
      mask:true
    })
    app.ajax('/NewKeyPlan', sendData, cb)
  },
  goDetail: function () {
    wx.navigateTo({
      url: '/pages/search/KR/result/index',
    })
  }
})