// pages/workCenter/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let userData = JSON.parse(app.globalData.userData);
    app.ajax("/TaskInfoList", { UserID: userData.PKID},function(res){
      let msg = JSON.parse(res.data.d)
      console.log(JSON.parse(msg.ReturnInfo));
      if (msg.State.toString()==="1"){
        that.setData({
          listData: JSON.parse(msg.ReturnInfo)
        })
      }
    })
  },

  goDetail:function(e){
  
    console.log(e.currentTarget.dataset.pkid)
    wx.navigateTo({
      url: '/pages/work/add/index?type=' + e.currentTarget.dataset.pkid,
    })
  }
})