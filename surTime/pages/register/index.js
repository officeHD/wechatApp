import { $wuxCountDown } from '../components/wux'
var app = getApp();
Page({
  data: {
    Email: '',// 邮箱
    PassWord: '',//密码
    Mobile:'',//手机号
    RecCode:'',//推荐码
    IPAddress:'1',//IP地址
    MobileCode:''//手机验证码
  },
  onLoad: function (options) {
    console.log(app.globalData.openId);
  },
  //确认注册
  register: function () {
    let that=this;
    let Email = that.data.Email;
    let PassWord = that.data.PassWord;
    let Mobile = that.data.Mobile;
    let RecCode = that.data.RecCode;
    let IPAddress = that.data.IPAddress;
    let MobileCode = that.data.MobileCode;
    let cb = msg => {
      let result = JSON.parse(msg.data.d)
      if (result.State.toString() === '1') {
        wx.showModal({
          title: '注册提示',
          content: "注册成功",
        })
        app.login();
       
      }
      if(result.State.toString()!=='1'){
        wx.showModal({
          title: '注册提示',
          content: result.ReturnInfo,
        })
      }
    }
    let data = {
      Email: Email,
      PassWord: PassWord,
      Mobile: Mobile,
      RecCode: RecCode,
      IPAddress: IPAddress,
      MobileCode: MobileCode,
      Openid: app.globalData.openId,
      WXNickName:app.globalData.userInfo.nickName,
    }
    if (app.checkData('手机号', Mobile) && app.checkData('邮箱', Email)&&app.checkData('密码',PassWord)&&app.checkData('验证码',MobileCode)){
      app.ajax('/WXRegister', data, cb)
    }
    
  },
  //获取短信验证码
  sendmessg: function (e) {
    let phone = this.data.Mobile;
    if (app.checkData('手机号', phone)) {
      if (this.c2 && this.c2.interval) {
        wx.showToast({
          title: '请稍后获取',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
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
      let cb = msg => {
        let res = JSON.parse(msg.data.d)
        if (res.State.toString() === "1"){
          wx.showToast({
            title: "短信发送成功",
            icon: 'none',
            duration: 2000
          })
        }
        if (res.State.toString() !== "1") {
          wx.showToast({
            title: res.ReturnInfo,
            icon: 'none',
            duration: 2000
          })
        }
      }
      app.ajax('/GetMobileCode', { Phone: phone }, cb)
    }
  }, //输入手机号
  verifyPhone:function(e){
    let value = e.detail.value;
    app.checkData('手机号', value)
  },
  changephone: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Mobile: value
    })
  },
  verifyEmail:function(e){
    let value = e.detail.value;
    app.checkData('邮箱', value)
  },
  //邮箱
  changeemail: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Email: value
    })
  },
  //密码
  verifyPass:function(e){
    let value = e.detail.value;
    app.checkData('密码', value)
  },
  changepassword: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      PassWord: value
    })
  },
  //手机验证码
  verifyCode:function(e){
    let value = e.detail.value;
    app.checkData('验证码', value)
  },
  changemsCode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      MobileCode: value
    })
  },
  //推荐码
  changeRecCode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      RecCode: value
    })
  }
})