// pages/album/detail/index.js
var ParserXml = require('../../../lib/xmldom/dom-parser')
var app = getApp();
var XMLParser = new ParserXml.DOMParser();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    album: [],
    uploadimg: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      Pictname: options.pictname
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
  uploadDIY: function (filePaths, successUp, failUp, i, length) {
    let that = this;
    wx.showLoading({
      title: '上传中',
    })
    wx.uploadFile({
      url: "https://mp.surtime.com/SurtimeWebService.asmx/UploadImages",
      filePath: filePaths[i],
      header: { "Content-Type": "multipart/form-data", 'Authorization': app.globalData.token },
      name: 'File',
      formData: {
        "Key": "SurTimeWebserviceS3ur0ti1me8",
        "IsUpdateName": 'false',
        "Pictid": that.data.id,
        "UserID": app.globalData.PKID,
        'Pictname': that.data.Pictname,
      },
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        that.setAlbum();
        if (i == length) {
          wx.hideLoading();
          wx.showToast({
            title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon:'none'
          })
         
        } else {  //递归调用uploadDIY函数
          that.uploadDIY(filePaths, successUp, failUp, i, length);
         
        }
      },
    });
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let list = this.data.album.map((item, index) => { return item.FileURL});
    console.log(list);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: list// 需要预览的图片http链接列表  
    })
  },
  add_pic: function (e) {
    let that = this;

    var upload_picture_list = that.data.upload_picture_list;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        var tempFilePaths = res.tempFilePaths;
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploadDIY(res.tempFilePaths, successUp, failUp, i, length);



      }
    })
  },

  deleteImage: function (e) {
    var that = this;
    let pkid = e.currentTarget.dataset.pkid;
    let fileName = e.currentTarget.dataset.filename;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          that.DelImage(pkid, fileName)
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          images
        });
      }
    })
  },
  //删除图片
  DelImage: function (pkid, fileName) {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      PicName: that.data.Pictname,
      Pkid: pkid,  //文件编号
      FileName: fileName //文件名称	 
    }
    let fn = msg => {
      let res = JSON.parse(msg.data.d);
      wx.showModal({
        title: '提示',
        content: res.ReturnInfo,
        success: function () {
          that.setAlbum();
        }
      })
    }
    app.ajax('/DelImage', data, fn)
  }
})