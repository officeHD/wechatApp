//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    src: 'http://tps.mschn.cn/mstps/static/js/mobile/zhongan/personal_card/35f7a7a915e9701152251289822a33a4.jpg',
    logs: []
  },
  onLoad: function (option) {
    // options.src ? this.setData({ src: options.src }) : wx.navigateBack();
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
