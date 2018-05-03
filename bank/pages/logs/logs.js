//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    src: '/images/hk_01.jpg',
    logs: []
  },
  onLoad: function (options) {
    console.log(options)
    options.src ? this.setData({ src: options.src }) : wx.navigateBack();
  },
  onShareAppMessage:function(){
    let that=this;
    return {
      title: '浓情五月集花献礼，开福袋赢好礼',
      imageUrl: that.data.src,
      path: `/pages/logs/logs?src=${that.data.src}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  save: function (e) {
    let src = e.currentTarget.dataset.src;

    wx.saveImageToPhotosAlbum({
      filePath: src,
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  }


})
