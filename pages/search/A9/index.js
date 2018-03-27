
var app = getApp();

Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    year:'2018',
    month: '09-01',
    position: 'relative',
    flag: true,
    listData: [ ]
  },
  onLoad: function () {
    let that = this;
    let cb = (res) => {
      that.setData({
        listData: res.data.list
      });
    }
    app.ajax('/productList', '', cb, 'POST')
  },
  sortArr: function (e) {
    let target = e.currentTarget.dataset.target;
    let that = this;
    let arr = that.data.listData;
    let flag = !that.data.flag;
    that.setData({
      flag: flag,
      listData: app.sort_object(arr, target, flag)
    });

  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  onReachBottom: function () {
    let that = this;
    let cb = (res) => {
      that.setData({
        listData: that.data.listData.concat(res.data.list)
      });
    }
    app.ajax('/productList', '', cb, 'POST')
  },
  onPageScroll: function (e) {
    let that = this;
    let scrollTop = e.scrollTop;

    if (scrollTop >= 60) {
      that.setData({
        position: 'fixed'
      });
    } else {
      that.setData({
        position: 'relative'
      });
    }
  },
  bindPickerChange: function (e) {
     
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
   
    this.setData({
      month: e.detail.value
    })
  },
  bindYearChange: function (e) {
     
    this.setData({
      year: e.detail.value
    })
  },

})