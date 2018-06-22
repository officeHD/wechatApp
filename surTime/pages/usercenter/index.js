var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    UserName: '',
    GKfen: '',
    TuDian: '',
    userListInfo: [{
      icon: '/images/user/youhuiquan.png',
      linkurl: '/pages/coupon/index',
      text: '我的优惠券'

    }, {
      icon: '/images/user/taocan.png',
      text: '套餐充值',
      linkurl: '/pages/user/index'

    }, {
      icon: '/images/user/xougaimima.png',
      linkurl: '/pages/reset/index',
      text: '修改密码'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  onShow: function () {
    this.updateT();

    let userData = app.globalData.userData;
    if (userData) {
      let userDatas = JSON.parse(userData);
      this.setData({
        avatarUrl:app.globalData.userInfo.avatarUrl,
        UserName: userDatas.UserName,
        GKfen: userDatas.GKfen,
        TuDian: userDatas.TuDian
      })
    }
    // console.log(1);
  },
  updateT: function () {
    let fn = msg => {

      let ret = JSON.parse(msg.data.d);
      app.initUserInfo(JSON.parse(ret.ReturnInfo));
      app.initUserData(ret.ReturnInfo);
    }
    app.ajax('/GetUserInfo', { Openid: app.globalData.openId }, fn)
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
    

  },


})