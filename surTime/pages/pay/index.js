// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    config:[
      {
        src: '入门级',
        price: "100",
        value: "100点",
        single: "(1.00元/T)",
        A9: "200元/ASIN",
        auto: "200元/周期",
        gk: "4.00元/ASIN",
        type: 1
      },
      {
        src: '基础级',
        price: "300",
        value: "350点",
        single: "(0.86元/T)",
        A9: "172元/ASIN",
        auto: "172元/周期",
        gk: "3.44元/ASIN",
        type: 2
      },
      {
        src: '标准级',
        
        price: "600",
        value:"800点",
        single: "(0.75元/T)",
        A9: "150元/ASIN",
        auto: "150元/周期",
        gk: "3.00元/ASIN",
        type: 3
      },
      {
        src: '专业级',
        price: "1200",
        value: "2000点",
        single: "(0.60元/T)",
        A9: "120/ASIN",
        auto: "120元/周期",
        gk: "2.4元/ASIN",
        type: 4
      },
      {
        src: '企业级',
        price: "2400",
        value: "3000点",
        single: "(0.48元/T)",
        A9: "96元/ASIN",
        auto: "96元/周期",
        gk: "1.72元/ASIN",
        type: 5
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    if (options.type) {
      that.setData({
        type: options.type
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