App({
  onLaunch: function () {
    var that=this;
    that.getUserData();
    wx.getStorage({
      key: 'staffid',
      success: function (res) {
        that.globalData.staffid = res.data;
      },
      fail: function (res) {
        that.globalData.staffid = '';
      }
    })
  },
  //获取用户信息openid和userId
  getUserData: function () {
    var that = this;
    var token = that.globalData.token;
    // 如果有token就直接获取
    if (token) {
      wx.request({
        url: that.globalData.ctx + '/user/wxinfo',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.getUserData();
          } else {
            // 存储openid和userid
            that.globalData.openid = res.data.data.openid;
            that.globalData.userId = res.data.data.userId;
          }
        }
      })
      return;
    }
    //否则微信登录获取
    wx.login({
      success: function (res) {
        // 获取token和uid
        wx.request({
          url: that.globalData.ctx + '/user/wxapp/login',
          data: {
            code: res.code
          },
          success: function (res) {
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code != 0) {
              // 登录错误
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false
              })
              return;
            }
            that.globalData.token = res.data.data.token;
            that.globalData.uid = res.data.data.uid;
            that.getUserData();
          }
        })
      }
    })
  },
  //注册
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: that.globalData.ctx + '/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.getUserData();
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    ctx: "https://api.it120.cc/hd ", 
    version: "1.0",
    openid:'',
    userId:'',
    staffid:''
  }
})