//app.js
import { ajax, checkData, saveUserInfo } from "utils/util.js"
App({
  onLaunch: function () {
    let that=this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        that.globalData.openId=res.data;
      }
    })
    
  },
  getUserInfo: function (cb) {
    var that = this
    if (!this.globalData.userInfo) {
      // 调用登录接口  
      wx.login({
        success: function (res) {
          var code = res.code// 登录凭证 
          that.globalData.code = res.code; 
          // 获取用户信息  
          wx.getUserInfo({
            // 当你获取用户信息的时候会弹出一个弹框是否允许授权  
            // 这里点击允许触发的方法  
            success: function (res2) {
              that.globalData.userInfo = res2.userInfo;
              that.globalData.encryptedData = res2.encryptedData;
              that.globalData.iv = res2.iv;
              cb();
            },
            // 这里是点击拒绝触发的方法  
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
                    that.getUserInfo()
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
    code:'',
    userInfo: '',
    encryptedData:'',
    iv:'',
    openId: '',
  },
  api: ajax,
  checkData: checkData
})