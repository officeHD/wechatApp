var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserName:'',
    GKfen:'',
    TuDian:'',
    userListInfo: [{
      icon: '/images/shop.png',
      linkurl: '/pages/coupon/index?type=user',
      text: '我的优惠券'

    }, {
      icon: '/images/ziliao.png',
      text: 'T点充值',
      linkurl: '/pages/recharge/index?type=1'

    }, {
      icon: '/images/shoucang.png',
      text: '账户充值',
      linkurl: '/pages/recharge/index?type=2'

    }, {
      icon: 'images/apply.png',
      linkurl: '/pages/reset/index',
      text: '修改密码'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let userData = app.globalData.userData;
    console.log(userData)
    if (userData) {
      let userDatas=JSON.parse(userData);
      this.setData({
        UserName: userDatas.UserName,
        GKfen: userDatas.GKfen,
        TuDian: userDatas.TuDian
      })
    } else {
      wx.navigateTo({
        url: "/pages/login/index"
      })
    }

  },

  toDetailsTap: function (e) {
    let url = e.currentTarget.dataset.detailurl;
    if (url) {
      if (!this.data.UserName) {
        url = "../login/index"
      }
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "产品开发中",
        showCancel: false,
      })
    }

  },
  //退出登录
  takeOut: function () {
    let that = this;
    wx.showModal({
      title: '退出提示',
      content: '确认退出？',
      success: function () {
        wx.clearStorageSync();
        app.globalData.PKID = '';
        app.globalData.UserName = '';
        app.globalData.Tel = '';
        app.globalData.userData = '';
        that.onLoad();
      }
    })

  },


})