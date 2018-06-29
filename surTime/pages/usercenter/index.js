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
    }, {
        icon: '/images/user/tuichu.png',
      linkurl: '/pages/unbind/index',
      text: '账号解绑'
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
     
    }
    // console.log(1);
  },
  updateT: function () {
    let that=this;
    let fn = msg => {
      let returnInf=JSON.parse(msg.data.d);
      if(returnInf.State==1){
        let ret = JSON.parse(msg.data.d);
        let jsRet=JSON.parse(ret.ReturnInfo);
        app.initUserInfo(jsRet);
        app.initUserData(ret.ReturnInfo);
        that.setData({
          avatarUrl:app.globalData.userInfo.avatarUrl,
          UserName: jsRet.UserName,
          GKfen: jsRet.GKfen,
          TuDian: jsRet.TuDian
        })
      }else{
        wx.showToast({
          title:returnInf.ReturnInfo,
          icon:'none'
        });
        // wx.clearStorage();
        app.login();
      }
     
      
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
   /**
  * 下拉刷新
  */
 onPullDownRefresh: function () {
  wx.showNavigationBarLoading() //在标题栏中显示加载
  //模拟加载
  this.onShow();
  wx.hideNavigationBarLoading() //完成停止加载
  wx.stopPullDownRefresh() //停止下拉刷新

},
  //退出登录
  takeOut: function () {
    let that = this;
    

  },


})