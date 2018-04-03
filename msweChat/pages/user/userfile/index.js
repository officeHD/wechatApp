// pages/userdata/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userdate: [{
      text: '代理人行为承诺书',
      url: 'https://cynthianc.github.io/images/123.pdf'
    }, {
      text: '代理人自动扣款授权书',
    }, {
      text: '代理人自保件承诺书',
    }, {
      text: '代理合同书'
    }, {
      text: '民盛代理人行为规范书'
    }, {
      text: '入司小票'
    }]
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

  },
  openFile: function (event) {
    var URL = event.currentTarget.dataset.target;
    var that = this
    if (!URL){
      showTip('暂无该合同');
      return;
    } 
    wx.downloadFile({
      url: URL,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log(res)
            // show('打开文档成功')
          },
          fail: function (res) {
            console.log('fail')
            console.log(res)
            showTip();
          },
          complete: function (res) {
            console.log('complete')
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log('fail')
        console.log(res)
      },
      complete: function (res) {
        console.log('complete')
        console.log(res)
      }
    })
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