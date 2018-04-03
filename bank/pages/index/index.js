//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    aidOpenId: null,//辅助openId
    totalNum: null,//集齐总数
    selfNum: null,//自己张数
    drawTimes: null,//抽奖次数
    showHelp: false,//显示好友助力
    isFirst: null,
    badge: {},
    userInfo: {},
    hasUserInfo: false,
    isloginback:false//从登陆页面返回
  },

  onLoad: function (options) {
    let that = this;
    // 如果有openId就是分享的
    if (options.openId) {
      that.setData({
        aidOpenId: options.openId
      })
    }
    

    if (app.globalData.openId && app.globalData.userInfo) {
      that.getUserData();
      that.setData({
        userInfo: app.globalData.userInfo,
        openId: app.globalData.openId
      })
    } else {
      app.openIdReadyCallback = res => {
        that.setData({
          openId: res.openId
        })
        console.log(3)
      }
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }
      that.getUserData();
    }

  },
  onShow:function(){
   let that=this;
  // 如果从注册页过来就直接开奖
   if (that.data.isloginback){
     that.starlottery();
     that.setData({
       isloginback:false
     })
   }
  },
  getUserData: function () {
    let openId = app.globalData.userInfo;
    let userInfo = app.globalData.userInfo;
    let aidOpenId = app.globalData.aidOpenId;
    let that = this;
    let fn = msg => {
      console.log(msg.data)
      if (msg.data.result.toString() === "1") {
        let userData = msg.data.userInfo;
        that.setData({
          badge: userData.badge,
          drawTimes: userData.drawTimes,
          isFirst: userData.isFirst,
          selfNum: userData.selfNum,
          totalNum: userData.totalNum,
        })
      }
    }
    app.api("/getUserData", { openId: openId }, fn)

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '好友助力集福气',
      path: `/pages/index/index?openId=${app.globalData.openId}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  lottery: function () {
    let that = this;
    if (that.data.isFirst === 1) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    } else if (that.data.drawTimes < 1) {
      that.setData({
        showHelp: true
      })
    }else{
      that.starlottery();
    }
  },
  starlottery: function () {
     wx.showLoading({
       title: '开始抽奖',
     })
     let fn=msg=>{
       wx.hideLoading()
       if(msg.data.result.toString()==="1"){
         wx.showModal({
           title: '抽奖结果',
           content: '恭喜您抽中了',
         })
       }
     }
     app.api("/lottery", { openId: app.globalData.openId }, fn)
  },
  changeShow: function () {
    let that = this;
    if (that.data.drawTimes < 1) {
      that.setData({
        showHelp: false
      })
    }
  },
  //跳转Tab
  tonotice: function () {
    wx.switchTab({
      url: '/pages/notice/index'
    })
  }
})
