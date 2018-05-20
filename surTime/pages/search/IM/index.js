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
    check1: false,
    check2: false,
    check3: false,
    flag: true,
    ASIN: '',
    listData: []
  },
  onLoad: function () {
    let that = this;



  },
  changeASIN: function (e) {
    let value = e.detail.value;
    let that = this;

    that.setData({
      ASIN: value
    })
  },
  changePlanName: function (e) {
    let value = e.detail.value;
    let that = this;

    that.setData({
      planName: value
    })
  },
  changeShopName: function (e) {
    let value = e.detail.value;
    let that = this;

    that.setData({
      shopName: value
    })
  },
  checkboxChange1: function (e) {
    this.setData({
      check1: !this.data.check1
    })
  },
  checkboxChange2: function (e) {
    this.setData({
      check2: !this.data.check2
    })
  },
  checkboxChange3: function (e) {
    this.setData({
      check3: !this.data.check3
    })
  },
  //新增
  newIMPlan: function () {
    let that = this;
    let UserID = app.globalData.PKID
    let Country = that.data.Country;
    let SellerName = that.data.shopName;
    let PlanName = that.data.planName;
    let ASIN = that.data.ASIN;
    if (!ASIN) {
      wx.showToast({
        title: '请输入ASIN',
        icon: "none"
      })
      return;
    }
    let data = {
      UserID: UserID,
      ASIN: ASIN,
      Country: Country,
      SellerName: SellerName,
      PlanName: PlanName,
      MonitoringCycleDay: that.data.timer,
      MonitoringFrequency: that.data.frequency,
      IsCreateRuning: that.data.check1,
      IsExpandVariation: that.data.check2,
      IsFBA: that.data.check3,
      AsinList: '',
      UserIpAddress: '',
      StopPage: 1,
      CompletePage: 1,
      PageCount: 1,
    };
    let cb = (res) => {
      let data = JSON.parse(res.data.d);
      if (data.State!==1){
        wx.showModal({
          title: '提示',
          content: data.ReturnInfo,
        })
      }else{
        that.goDetail();
      }
      
    }
    app.ajax('/NewIMPlan', data, cb)
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
  goDetail: function () {
    wx.navigateTo({
      url: './detail/index',
    })
  }
})