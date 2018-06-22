//app.js
const util = require('./utils/util.js');
const api = require('./utils/ajax.js')
App({
  onLaunch: function () {
    wx.getSetting({
      success: res => {
        console.log(res)
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
  login:function(){
    let that=this;
    wx.showLoading({
      title: '登录中',
      mask:true
    })
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            
          },
          fail: function (res) {
            console.log(res);
          }
        })
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://mp.surtime.com/SurtimeWebService.asmx/WXLogin',
            method: 'POST',
            data: {
              Code: res.code,
              Key: "SurTimeWebserviceS3ur0ti1me8"
            },
            success: function (res) {
              // console.log(JSON.parse(res.data.d));
              wx.hideLoading();

              let ret = JSON.parse(res.data.d);
              if (ret.State === 1) {
               // console.log(ret.ReturnInfo.length)
                if (ret.ReturnInfo.length < 30) {
                  that.globalData.openId = ret.ReturnInfo;
                  wx.showModal({
                    title: '登录提示',
                    content: '请绑定账号或注册',
                    success: function () {
                       
                    }
                  })
                  
                } else {
                  that.initUserInfo(JSON.parse(ret.ReturnInfo));
                  that.initUserData(ret.ReturnInfo);
                  that.initToken(res.header.Authorization);
                  wx.switchTab({
                    url: '/pages/usercenter/index',
                  })
                  if (this.employIdCallback) {
                    this.employIdCallback(res.header.Authorization);
                  }
                }
              }
            }
          })
        } else {
         // console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  initUserData: function (userData) {
    wx.setStorage({
      key: "userData",
      data: userData
    })
    this.globalData.userData = userData;
  },
  initToken: function (val) {
    this.globalData.token = val;
    wx.setStorage({
      key: "token",
      data: val
    })
  },
  initUserInfo: function (obj) {
    this.globalData.PKID = obj.PKID;
    this.globalData.Email = obj.Email;
    this.globalData.IsAdmin = obj.IsAdmin;
    this.globalData.Tel = obj.Tel;
    this.globalData.UserName = obj.UserName;
    this.globalData.openId = obj.Openid;
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
    userData: '',
    token: '',
    runingData: [],
    stopData: [],
    openId: '',
    finishData: []
  },

  ajax: api.ajax,

  trim: api.trim,
  checkData: util.checkData,
  sort_object: util.sort_object,
  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/&lt;b&gt;/ig, '\r\n');
    returnText = returnText.replace(/&lt;\/b&gt;/ig, '\r\n');
    returnText = returnText.replace(/<li>/ig, '  *  ');
    returnText = returnText.replace(/<\/ul>/ig, '\r\n');
    //-- remove BR tags and replace them with line break
    returnText = returnText.replace(/&lt;br&gt;/gi, "\r\n");
    returnText = returnText.replace(/&lt;\/br&gt;/gi, "\r\n");
    //-- remove P and A tags but preserve what's inside of them
    returnText = returnText.replace(/<p.*?>/gi, "\r\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
    //-- remove all inside SCRIPT and STYLE tags
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
    //-- get rid of more than 2 multiple line breaks:
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");
    //-- get rid of more than 2 spaces:
    returnText = returnText.replace(/ +(?= )/g, '');
    //-- get rid of html-encoded characters:
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;

  }
})