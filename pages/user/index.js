
var app = getApp();

Page({
  data: {
    recordType: 'recharge',
    index: 0,

    position: 'relative',
    flag: true,
    listData: [],
    consumeList:[]
  },
  onLoad: function () {
    let that = this;
    let cb = (res) => {
      that.setData({
        listData: res.data.list
      });
    }
    app.ajax('/recordList', '', cb, 'POST')
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
    app.ajax('/recordList', '', cb, 'POST')
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
  searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    this.setData({
      recordType: target
    })
    let cb = (res) => {
      that.setData({
        consumeList: res.data.list
      });
    }
    app.ajax('/consumeList', '', cb, 'POST')
  }

})