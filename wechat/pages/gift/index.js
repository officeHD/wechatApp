// pages/gift/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geturl: '',
    name:'',
    phone:'',
    region: [],
    showAddress:0,
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading()
    let that = this;
    console.log(this.data.region.join(''))
    let fn = msg => {
      if (msg.data.result.toString() === "1") {
        let geturl = msg.data.getUrl;
        that.setData({
          geturl: geturl
        })
      }
    }
     
    // app.api("/getUrl", {}, fn)
  },

  lottery: function () {
    let url = this.data.geturl;
    wx.navigateTo({
      url: '/pages/webview/index?url=' + encodeURIComponent(this.data.geturl)
    })
    // let fn=msg=>{
    //   console.log(msg)
    // }
    // app.api("/openhongbao", {}, fn)
  },
  storeAddress:function(){
    let address = this.data.region.join('') + this.data.address;
    let name = this.data.name;
    let phone = this.data.phone;
    let fn=msg=>{
      wx.hideLoading()
      if(msg.data.result.toString()==='1'){
        that.changeShow();
      }
    }
    let data={
      smallopenid: app.globalData.openId,
      address: address,
      mobile: phone,
      name: name,
    }
    if (app.checkData('收货人姓名', name) && app.checkData('手机号', phone) && app.checkData('详细住址', address)){
      wx.showLoading({
        title: '加载中',
      })
      app.api("/storeAddress", data, fn)
    }

    
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  changeShow:function(){
    let that = this;
    this.setData({
      showAddress: !that.data.showAddress
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})