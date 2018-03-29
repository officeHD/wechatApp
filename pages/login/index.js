var app = getApp();
Page({
  data: {
    by_message: false,
    getmsg: "获取验证码",
    reset_pass: false,
    login_type: "短信快捷登录",
    reset_word: "忘记密码",
    flag: true,
    codeDis: false,
    userPhone: '',
    verifyCode:'',
    passWord:''
   
  },
  onLoad: function () {

  },
  //切换登录方式
  onChangeLoginType: function (e) {
    console.log(e);
    let that = this;
    that.setData({
      by_message: (!that.data.by_message),
      login_type: that.data.by_message ? "短信快捷登录" : "账号密码登录"
    })
  },
  // 获取验证码
  sendmessg: function (e) {
    let that = this;
    if (app.checkData('手机号', that.data.userPhone)) {
      that.setData({
        codeDis: true
      })
      let second = 60;
      let time = setInterval(() => {

        second--
        that.setData({
          getmsg: `${second}秒`
        })
        if (second == 0) {
          clearInterval(time)
          that.setData({
            getmsg: "获取验证码",
            flag: true,
            codeDis: false
          })
        }
      }, 1000)

    }
  },

  //重置密码
  resetPassWord: function (event) {
    console.log(event)
    var that = this;
    that.setData({
      reset_pass: !that.data.reset_pass,
      reset_word: that.data.reset_pass ? "忘记密码" : "取消重置",
      login_type: that.data.reset_pass ? "短信快捷登录" : ""

    })
  },
  // 填写值
  changePhoneNum: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      userPhone: value
    })
  }, 
  // 填写值
  changeVerifyCode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      verifyCode: value
    })
  }, 
  // 填写值
  changePassWord: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      passWord: value
    })
  },

  
  //点击登录
  login:function(e){
    let that=this;
    let type = e.currentTarget.dataset.type;
    if (type){
      if (app.checkData('手机号', that.data.userPhone) && app.checkData('验证码', that.data.verifyCode)){
        wx.navigateTo({
          url:"/pages/user/index"
        })
      } 
    }else{
      if (app.checkData('手机号', that.data.userPhone) && app.checkData('密码', that.data.passWord)) {
        wx.navigateTo({
          url: "/pages/user/index"
        })
      } 
    }
  }
})