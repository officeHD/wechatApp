import { $wuxCountDown } from '../components/wux'
var app = getApp();
Page({
  data: {
    by_message: false,
    
    getmsg: "获取验证码",
    reset_pass: false,
    login_type: "短信快捷登录",
    phone: '',
    mesCode: '',
    reset_word: "忘记密码"
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    by_message: (options.by_message == "true" ? true : false)
  },
  changephone: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      phone: value
    })
  },
  sendmessg: function (e) {
    let phone = this.data.phone;
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
      let cb = msg => {
        if (msg.data.result.toString() !== "1") {
          wx.showToast({
            title: msg.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
      app.ajax('/GetMobileCode', { Phone: phone }, cb)
    }
  },
  register: function () {
    app.ajax('/Register', { phone: phone }, cb)
  }
})