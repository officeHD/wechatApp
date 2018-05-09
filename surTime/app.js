//app.js
const util = require('./utils/util.js');
const api = require('./utils/ajax.js')
App({
  onLaunch: function () {
    // 展示本地存储能力

    var PKID = wx.getStorageSync('PKID') || '';
    var Tel = wx.getStorageSync('Tel') || '';
    var UserName = wx.getStorageSync('UserName') || '';
    var userData = wx.getStorageSync('userData') || '';
    this.globalData.userData = userData;
    this.globalData.PKID = PKID;
    this.globalData.UserName = UserName;
    this.globalData.Tel = Tel;
    // 登录
     
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  initUserData: function (userData){
    wx.setStorage({
      key: "userData",
      data: userData
    })
    this.globalData.userData =userData;
  },
  initUserInfo: function (obj) {

    this.globalData.PKID = obj.PKID;
    this.globalData.Email = obj.Email;
    this.globalData.IsAdmin = obj.IsAdmin;
    this.globalData.Tel = obj.Tel;
    this.globalData.UserName = obj.UserName;
    wx.setStorage({
      key: "PKID",
      data: obj.PKID
    })
    wx.setStorage({
      key: "Email",
      data: obj.Email
    })

    wx.setStorage({
      key: "IsAdmin",
      data: obj.IsAdmin
    })
    wx.setStorage({
      key: "Tel",
      data: obj.Tel
    })
    wx.setStorage({
      key: "UserName",
      data: obj.UserName
    })

  },
  globalData: {
    userInfo: null,
    userData:'',
    runingData: [],
    stopData: [],
    finishData: []
  },

  ajax: api.ajax,
  
  trim: api.trim,
  checkData: util.checkData,
  sort_object: util.sort_object
})