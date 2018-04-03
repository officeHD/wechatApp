var app = getApp();
const UserName = wx.getStorageSync('UserName')
Page({
  data: {
    recordType: 'recharge',
    index: 0,
    position: 'relative',
    flag: true,
    listData: [],
    consumeList: []
  },
  onLoad: function () {
    let that = this;
    let cb = (res) => {
      wx.hideLoading()
      let result = JSON.parse(res.data.d);
      if (result.State.toString() === "1") {
        console.log(JSON.parse(result.ReturnInfo))
        that.setData({
          listData: JSON.parse(result.ReturnInfo)
        });
      }
      // console.log(result)

    }
    wx.showLoading({
      title: '加载中',
    })

    app.ajax('/GetRechargeListByUser', { UserName: UserName }, cb)
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
    console.log(target);
    this.setData({
      recordType: target
    })
    if (target ==="consume"){
      let cb = (res) => {
        wx.hideLoading()
        let result = JSON.parse(res.data.d);
        if (result.State.toString() === "1") {
          console.log(JSON.parse(result.ReturnInfo))
          that.setData({
            consumeList: JSON.parse(result.ReturnInfo)
          });
        }
        // console.log(result)
      }
      wx.showLoading({
        title: '加载中',
      })
      app.ajax('/GetOperationListByuser', { UserName: UserName }, cb)
    } 
   
  }

})