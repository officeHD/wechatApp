// pages/album/detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    album: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.setAlbum();
  },
  setAlbum: function () {
    let that = this;
    let data = {
      Picid: that.data.id,
      UserID: app.globalData.PKID,
      Page: '1',
      PageCount: '20'
    }
    app.ajax('/Getpictable', data, function (res) {
      
      let albumList = JSON.parse(JSON.parse(res.data.d).ReturnInfo);
      console.log(albumList)
      that.setData({
        album: albumList
      })
    })
  },
  add_pic: function (e) {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: '', // 上传接口
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },

  showDel: function (e) {
    console.log(e)
  }
})