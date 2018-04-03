// pages/login/index.js
var app = getApp();
var API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: {
      logo: '../../images/login.png',
      user: '../../images/user.png',
      password: '../../images/password.png'
    },
    userName: '',
    
    passWord: '' 
    
  },
  //用户名和密码输入框事件
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  // 登录按钮
  loginBtnClick: function () {
    var username = this.data.userName;
    var password = this.data.passWord;
    if (username.trim().length == 0 || password.trim().length == 0) {
      showTip('温馨提示：用户名和密码不能为空！')
    } else {
      // 使用 Mock
      API.ajax('', function (res) {
        app.globalData.staffid = res.staffid;
        wx.setStorage({
          key: 'staffid',
          data: res.staffid,
        });
        wx.navigateBack();
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
export const show = function (tip) {
  wx.showToast({
    title: tip || '成功',
    icon: 'success',
    duration: 2000
  })
}
export const showTip = function (tip) {
  wx.showModal({
    title: '提示',
    content: tip || '操作失败！',
    showCancel: false,
  })
}