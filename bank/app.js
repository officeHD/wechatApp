//app.js
import { ajax, checkData } from "utils/util.js"
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      
        let fn = msg => {
          if (msg.data.result.toString() === "1") {
            this.globalData.openId = msg.data.openId;
          
            if (this.openIdReadyCallback) {
              this.openIdReadyCallback(msg.data)
            }
          }
        }
        ajax('/getOpenId', { code: res.code }, fn);
      }
    })
    // 获取用户信息
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        }
      }
    })
  },


  globalData: {
    userInfo: null,
    openId: null
  },
  api: ajax,
  checkData: checkData
})