// pages/insurance/life_insurance/index.js
var app = getApp();
var API = require('../../../utils/api.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeCategoryId: '0',
    categories: [
      { name: "全部", id: '0' },
      { name: "重疾险", id: '1' },
      { name: "意外险", id: '2' },
      { name: "年金险", id: '3' },
    ],
    insurancelist: [
      {
        id: '1',
        name: '安邦安鑫利两全保险',
        title: '',
        detail: '1',
        sale: '',
        price: '',
        icon: '',
        pic: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载',
    })
    // 获取全部寿险
    that.getList(0);
    // 使用 Mock
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        list: res.data
      })
    });



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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

  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getList(this.data.activeCategoryId);
  },
  getList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    API.ajax('', function (res) {
      that.setData({
        list: res.data
      })
    });

  }
})