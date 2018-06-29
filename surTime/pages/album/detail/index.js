// pages/album/detail/index.js
var ParserXml = require('../../../lib/xmldom/dom-parser')
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    delStu: false,
    album: [],
    page: 1,
    uploadimg: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id,
      Pictname: decodeURIComponent(options.pictname),
      page: 1
    })
    this.setAlbum();

  },
  setAlbum: function () {
    let that = this;
    let data = {
      Picid: that.data.id,
      UserID: app.globalData.PKID,
      Page: that.data.page,
      PageCount: '50'
    }
    app.ajax('/Getpictable', data, function (res) {

      let albumList = JSON.parse(JSON.parse(res.data.d).ReturnInfo);
      //console.log(albumList)

      that.setData({
        album: albumList,
        albumlength: albumList.length,
        page: that.data.page + 1
      })
    })
  },
  //加载更多
  onReachBottom: function () {
    let that = this;
    if (that.data.albumlength === 0) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return false;
    }
    this.setAlbum();
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
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
        var XMLParser = new ParserXml.DOMParser();
        var doc = XMLParser.parseFromString(resp.data);
        var prepay_id = doc.getElementsByTagName("string")[0].firstChild.nodeValue;//获取节点名字为prepay_id的值
        console.log(prepay_id);
        let resultMes = JSON.parse(prepay_id);
        if (resultMes.State == 1) {
          successUp++;
        } else {
          wx.showToast({
            title: resultMes.ReturnInfo,
            icon: 'none'
          })
          failUp++;
        }

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
            icon: 'none'
          })
        } else {  //递归调用uploadDIY函数
          that.uploadDIY(filePaths, successUp, failUp, i, length);

        }
      },
    });
  },
  //预览图片
  previewImage: function (e) {
    if (this.endTime - this.startTime < 350) {
      var current = e.target.dataset.src;
      let list = this.data.album.map((item, index) => { return item.FileURL });
      //console.log(list);
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: list// 需要预览的图片http链接列表  
      })
    }

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
  choseImg: function (e) {
    var that = this;
    let pkid = e.currentTarget.dataset.pkid;
    let fileName = e.currentTarget.dataset.filename;
    let key = e.currentTarget.dataset.key;
    //console.log(key);
    let data = that.data.album;
    data[key].select = !that.data.album[key].select
    that.setData({
      album: data
    })

  },
  deleteImage: function (e) {
    var that = this;
    let pkid = e.currentTarget.dataset.pkid;
    let fileName = e.currentTarget.dataset.filename;
    that.setData({
      delStu: true
    })

  },
  cancel: function () {
    let data = this.data.album.map((item, index) => { return { ...item, select: false } })
    this.setData({
      delStu: false,
      album: data
    })
  },
  del_pic: function () {
    let that = this;
    let data = that.data.album.filter(function (item, index) {
      return item.select
    });

    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = data.length; //总共个数
    var i = 0; //第几个
    that.DelImage(data, successUp, failUp, i, length);


  },

  //删除图片
  DelImage: function (data, successUp, failUp, i, length) {
    let that = this;
    let datas = {
      UserID: app.globalData.PKID,
      PicName: that.data.Pictname,
      Pkid: data[i].UniqueID1,  //文件编号
      FileName: data[i].FileName //文件名称	 
    }
    let fn = msg => {
      let res = JSON.parse(msg.data.d);
      if (res.State === 1) {
        successUp++;
      } else {
        failUp++;
      }
      i++;
      that.setAlbum();
      if (i == length) {
        wx.hideLoading();
        wx.showToast({
          title: '总共' + successUp + '张删除成功,' + failUp + '张删除失败！',
          icon: 'none'
        })
      } else {  //递归调用uploadDIY函数
        that.DelImage(data, successUp, failUp, i, length);

      }

    }
    app.ajax('/DelImage', datas, fn)
  }
})

