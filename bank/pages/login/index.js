// pages/login/index.js
import { $wuxCountDown } from '../components/wux'
var app = getApp();
Page({

  data: {
    phone: '',
    mesCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //用户名和密码输入框事件
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  mesCodeInput: function (e) {
    this.setData({
      mesCode: e.detail.value
    })
  },
  //绑定手机号
  enter: function () {
    let phone = this.data.phone, mesCode = this.data.mesCode;
    if (app.checkData('手机号', phone) && app.checkData('验证码', mesCode)) {
      let cb = msg => {
        if (msg.data.result.toString() === "1") {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            isloginback: true,
          })
          wx.navigateBack()
        } else {
          wx.showToast({
            title: msg.data.message,
            icon: 'none',
            duration: 2000
          })

        }
      }
      app.api('/checkCode', { phone: phone, code: mesCode }, cb)
    }
  },
  vcode: function () {
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
      app.api('/getMse', { phone: phone }, cb)
    }

  }


})