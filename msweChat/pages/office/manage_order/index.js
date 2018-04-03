// pages/office/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    staffid: '',
    worklist: [
      { name: "寿险订单", icon: '../../../images/office/icon1.png', url: "increase/index" },
      { name: "车险订单", icon: '../../../images/office/icon2.png', url: "manage_customers/index" },
      { name: "卡单订单", icon: '../../../images/office/icon3.png', url: "order_customers/index" } 
      
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
    // 判断是否有staffid
    if (!that.data.staffid) {
      wx.getStorage({
        key: 'staffid',
        success: function (res) {
          that.setData({
            staffid: res.data
          });
        },
      })
    }
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