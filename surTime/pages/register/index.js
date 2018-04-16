import { $wuxCountDown } from '../components/wux'
var app = getApp();
Page({
  data: {
    by_message: false,
    reset_pass: false,
    phone: '',
    mesCode: ''
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
  },
  register: function () {
    app.ajax('/Register', { phone: phone }, cb)
  }
})