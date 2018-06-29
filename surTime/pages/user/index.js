var app = getApp();

Page({
  data: {
    recordType: 'recharge',
    index: 0,
    position: 'relative',
    flag: true,
    active:1,
    imgurl: [
      {
        src: '入门级',
        price:"100元=100T",
        single:"(1.00元/T)",
        A9: "200元/ASIN",
        auto: "200元/周期",
        gk:"4.00元/ASIN",
        type: 1
      },
      {
        src: '基础级',
        price: "300元=350T",
        single: "(0.86元/T)",
        A9: "172元/ASIN",
        auto: "172元/周期",
        gk: "3.44元/ASIN",
        type: 2
      },
      {
        src: '标准级',
        price: "600元=800T",
        single: "(0.75元/T)",
        A9: "150元/ASIN",
        auto: "150元/周期",
        gk: "3.00元/ASIN",
        type: 3
      },
      {
        src: '专业级',
        price: "1200元=2000T",
        single: "(0.60元/T)",
        A9: "120/ASIN",
        auto: "120元/周期",
        gk: "2.4元/ASIN",
        type: 4
      },
      {
        src: '企业级',
        price: "2400元=5000T",
        single: "(0.48元/T)",
        A9: "96元/ASIN",
        auto: "96元/周期",
        gk: "1.72元/ASIN",
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

  bindchange:function(e){
    // console.log(e.detail.current)
    let current = e.detail.current;
    this.setData({
      active: current
    })
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
    app.ajax('/GetRechargeListByUser', { UserName: app.globalData.UserName,UserID:app.globalData.PKID }, cb)
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
    app.ajax('/GetOperationListByuser', { UserName: app.globalData.UserName,UserID:app.globalData.PKID }, cb)
  },
  payOrder: function (e) {

    wx.navigateTo({
      url: `/pages/pay/index?type=${e.currentTarget.dataset.type}`,
    })
  }

})