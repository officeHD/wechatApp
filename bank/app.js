//app.js
import { ajax, checkData } from "utils/util.js"
App({
  onLaunch: function () {
    let that=this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        that.globalData.openId=res.data;
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
      }
    })
  },

  getUserData:function(cb){
   
    let that = this;
    if (!that.globalData.userInfo){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          that.globalData.userCode = res.code
          // 获取用户信息
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              that.globalData.encryptedData = res.encryptedData
              that.globalData.iv = res.iv
              if(cb){
                cb();
              }
            },
            fail: function (res2) {
              // 在这里做一下兼容，有些同行业的用户会点击拒绝玩一玩看你们的小程序是否存在bug，  
              // 所以在这里还是加上下面这两行代码吧，打开微信小程序的设置，允许小程序重新授权的页面  
              wx.openSetting({
                success: (res) => {
                  // 下面的代码格式按照我的写，不要看工具打印的什么，在这里提醒大家一句，有时候不能相信开发者工具，因为  
                  // android和ios还有工具底层的js库是不同的，有些时候坑的你是一点脾气也没有，所以大家注意一下，  
                  // 不相信的慢慢的去自己跳坑吧  
                  if (res.authSetting["scope.userInfo"]) {
                    // 进入这里说明用户重新授权了，重新执行获取用户信息的方法  
                    that.getUserData(cb)
                  }
                }
              })
            }  
          })
        }
      })
    }
   
  },
  globalData: {
    userInfo: null,
    openId: '',
    url:'/images/index'
  },
  api: ajax,
  checkData: checkData
})