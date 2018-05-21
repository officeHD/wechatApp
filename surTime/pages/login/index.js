var app = getApp();
import { $wuxCountDown } from '../components/wux'
Page({
  data: {
    by_message: false,
    reset_pass: false,
    login_type: "短信快捷登录",
    reset_word: "忘记密码",
    flag: true,
    codeDis: false,
    userName: '',
    userPhone: '',
    verifyCode: '',
    passWord: '',
    newPassWord: ''
  },
  onLoad: function () {
    let UserID = app.globalData.PKID;
    if (UserID) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }

  },
  //切换登录方式
  onChangeLoginType: function (e) {
    let that = this;
    that.setData({
      by_message: (!that.data.by_message),
      login_type: that.data.by_message ? "短信快捷登录" : "账号密码登录"
    })
  },
  // 获取验证码
  sendmessg: function (e) {
    let phone = this.data.userPhone;
    if (app.checkData('手机号', phone)) {
      if (this.c2 && this.c2.interval) return !1
      this.c2 = new $wuxCountDown({
        date: +(new Date) + 60000,
        onEnd() {
          this.setData({
            c2: '重新获取验证码',
          })
        },
        render(date) {
          const sec = this.leadingZeros(date.sec, 2) + ' 秒后重发 '
          date.sec !== 0 && this.setData({
            c2: sec,
          })
        },
      })
      // 请求获取验证码
      let cb = res => {
        let result = JSON.parse(res.data.d);
        if (result.State.toString() !== "1") {
          wx.showToast({
            title: result.ReturnInfo,
            icon: 'none',
            duration: 2000
          })
        }
      }
      app.ajax('/GetMobileCode', { Phone: phone }, cb)
    }
  },

  // 填写手机号值
  changePhoneNum: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      userPhone: value
    })
  },
  // 填写验证码值
  changeVerifyCode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      verifyCode: value
    })
  },
  // 填写密码值
  changePassWord: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      passWord: value
    })
  },

  // 填写用户名值
  changeUserName: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      userName: value
    })
  },

  //点击登录
  login: function (e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    let userPhone = app.trim(that.data.userPhone),
      verifyCode = app.trim(that.data.verifyCode),
      userName = app.trim(that.data.userName),
      passWord = app.trim(that.data.passWord);
    let fn = (res) => {
      wx.hideLoading()
      let result = JSON.parse(res.data.d);
      
      if (result.State.toString() === "1") {
        // 储存用户信息
        // console.log(res.header.Authorization);
        app.initUserInfo(JSON.parse(result.ReturnInfo));
        app.initUserData(result.ReturnInfo);
        app.initToken(res.header.Authorization)
        // console.log(JSON.parse(result.ReturnInfo))
        wx.switchTab({
          url: '/pages/usercenter/index',
        })
      } else {
        wx.showToast({
          title: result.ReturnInfo,
          icon: 'none',
          duration: 2000
        })
      }
    }
    if (type) {
      if (app.checkData('手机号', userPhone) && app.checkData('验证码', verifyCode)) {
        let data = {
          "Phone": userPhone,
          "Code": verifyCode
        };
        wx.showLoading({
          title: '登录中',
        })
        app.ajax('/MobileLogin', data, fn)
      }
    } else {
      if (app.checkData('账号', userName) && app.checkData('密码', passWord)) {
        let data = {
          "UserName": userName,
          "PassWord": passWord,
          "LoginType": 1
        };
        wx.showLoading({
          title: '登录中',
        })
        app.ajax('/Login', data, fn)
      }
    }
  }
 
 
})