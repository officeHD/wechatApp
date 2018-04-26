// pages/search/A9/detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let pkid = options.pkid;
    let UserID = app.globalData.PKID;
    let that = this;

    //根据子表ChildPkId, 查看A9产品子表信息
    app.ajax('/GetPIChildbyID', { UserID: UserID, ChildPkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo[0])
      that.setData({
        tableInfo: ReturnInfo[0]
      })
    })
    //获取商品近三个月曝光量、点击量、销量明细
    app.ajax('/GetHistoryDatabyID', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      // let ReturnInfo = JSON.parse(data.ReturnInfo);
      // console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //关键词入口渠道占比图形数据
    app.ajax('/GetASINStatisticsByID', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //获取A9精准关键词分析信息(滚动条)
    app.ajax('/GetKeywordAnalysis', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum:'20' }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //获取A9流量关键词分析信息(滚动条)
    app.ajax('/GetKeywordRedAnalysis', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //获取A9关联ASIN分析(滚动条)
    app.ajax('/GetPageRelatedASIN', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
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