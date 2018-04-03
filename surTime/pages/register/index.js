var app = getApp();
Page({
  data: {
    by_message: false,
    sendmsg: "get_message",
    getmsg: "获取验证码",
    reset_pass: false,
    login_type: "短信快捷登录",
    reset_word: "忘记密码"
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    by_message: (options.by_message == "true" ? true : false)
  },
  onChangeLoginType: function () {
    var that = this;

    that.setData({
      by_message: (!that.data.by_message),
      login_type: that.data.by_message ? "短信快捷登录" : "账号密码登录"
    })
  },
  sendmessg: function (e) {

    if (timer == 1) {
      timer = 0
      var that = this
      var time = 60
      that.setData({
        sendmsg: "send_message",
      })
      var inter = setInterval(function () {
        that.setData({
          getmsg: time + "s后重新发送",
        })
        time--
        if (time < 0) {
          timer = 1
          clearInterval(inter)
          that.setData({
            sendmsg: "get_message",
            getmsg: "获取短信验证码",
          })
        }
      }, 1000)
    }
  },
  //重置密码
  resetPassWord: function () {
    var that = this;
    that.setData({
      reset_pass: !that.data.reset_pass,
      reset_word: that.data.reset_pass ? "忘记密码" : "取消重置",
      login_type: that.data.reset_pass ? "短信快捷登录" : ""

    })
  }
})