// pages/album/detail/index.js
var ParserXml = require('../../../lib/xmldom/dom-parser')
var app = getApp();
var XMLParser = new ParserXml.DOMParser();

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
  add_pic: function (e) {
    let that = this;
    
    
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        
        wx.uploadFile({
          url: 'http://192.168.0.106/SurtimeWebService.asmx/UploadImages', // 上传接口
          filePath: tempFilePaths[0],
          header: { "Content-Type": "multipart/form-data", 'Authorization': app.globalData.token },
          name: 'file',
          formData: {
            "Key": "SurTimeWebserviceS3ur0ti1me8",
            "IsUpdateName": 'false',
            "Pictid": that.data.id,
            "UserID": app.globalData.PKID,
            'Pictname': that.data.Pictname,
          },
          success: function (res) {
            var doc = XMLParser.parseFromString(res.data);
            let msg = JSON.parse(doc.getElementsByTagName('string')[0].childNodes['0'].nodeValue);
            if(msg.State===1){
              wx.showModal({
                title: '提示',
                content: '上传成功',
              })
            }else{
              wx.showModal({
                title: '提示',
                content: msg.ReturnInfo,
              })
            }
            // var data = res.data
            //do something
          }
        })
      }
    })
  },

  deleteImage: function (e) {
    var that = this;
    let pkid = e.currentTarget.dataset.pkid;
    let fileName = e.currentTarget.dataset.fileName;
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