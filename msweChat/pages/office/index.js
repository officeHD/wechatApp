// pages/office/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    staffid:'',
    worklist: [
      { name: "增员", icon: '../../images/office/icon1.png', url: "increase/index" },
      { name: "客户管理", icon: '../../images/office/icon2.png', url: "manage_customers/index" },
      { name: "订单管理", icon: '../../images/office/icon3.png', url: "manage_order/index" },
      { name: "保全管理", icon: '../../images/office/icon1.png' },
      { name: "理赔管理", icon: '../../images/office/icon3.png' },
      { name: "续期管理", icon: '../../images/office/icon6.png' },
      { name: "寄件管理", icon: '../../images/office/icon1.png' }
    ],
    joblist: [
      { name: "考勤打卡", icon: '../../images/office/icon1.png' },
      { name: "签批", icon: '../../images/office/icon_2.png' },
      { name: "日程", icon: '../../images/office/icon_3.png' },
      { name: "展业工具", icon: '../../images/office/icon1.png' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toDetailsTap: function (e) {
    let url = e.currentTarget.dataset.detailurl;
    if (url) {
      if (!this.data.staffid) {
        url = "../login/index"
      }
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "产品开发中",
        showCancel: false,
      })
    }

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
    var that = this;
    that.setData({
      staffid: app.globalData.staffid
    });
   

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