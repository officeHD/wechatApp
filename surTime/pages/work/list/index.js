// pages/workCenter/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'left',
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userData = JSON.parse(app.globalData.userData);
    app.ajax("/TaskIng", { UserID: userData.PKID }, function (res) {
      let msg = JSON.parse(res.data.d)
      // console.log(msg);
      if (msg.State.toString() === "1") {
        that.setData({
          listData: JSON.parse(msg.ReturnInfo)
        })
      }
    })
    app.ajax("/TaskBack", { UserID: userData.PKID }, function (res) {
      let msg = JSON.parse(res.data.d)
      // console.log(msg);
      if (msg.State.toString() === "1") {
        that.setData({
          listData1: JSON.parse(msg.ReturnInfo)
        })
      }
    })
    app.ajax("/TaskCompleted", { UserID: userData.PKID }, function (res) {
      let msg = JSON.parse(res.data.d)
      // console.log(msg);
      if (msg.State.toString() === "1") {
        that.setData({
          listData2: JSON.parse(msg.ReturnInfo)
        })
      }
    })
  },
  searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    this.setData({
      active: target

    })
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