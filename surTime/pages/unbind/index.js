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
  //重置密码
  resetPassWord: function (event) {
    let that = this;
    that.setData({
      reset_pass: !that.data.reset_pass,
      reset_word: that.data.reset_pass ? "忘记密码" : "取消重置",
      login_type: that.data.reset_pass ? "短信快捷登录" : ""

    })
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
  //输入新密码
  changeNewPassWord: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      newPassWord: value
    })
  },
  //确认重制
  update: function () {
    let that = this;
    let data = {
      UserID:app.globalData.PKID,//
      Phone: that.data.userPhone,
      Code: that.data.verifyCode
    }
    let fn = msg => {
      // console.log(1);
      let returnInf=JSON.parse(msg.data.d) ;
      if(returnInf.State==1){
        wx.showToast({
          title: '修改成功',
        })
        // wx.clearStorage();
       app.login();
      }else{
        wx.showToast({
          title: returnInf.ReturnInfo,
        })
      }
      
      console.log(returnInf);
    }
    if (app.checkData('手机号', that.data.userPhone) && app.checkData('验证码', that.data.verifyCode)) {

      app.ajax('/WXUserUNBinding', data, fn)
    }

  },
  login_wx: function (e) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })

  }

})