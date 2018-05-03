// pages/gift/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    range: '',//排名
    geturl: '',
    totalSecond: '',
    starSecond: '',
    endSecond: '',
    name: '',//收货人姓名
    phone: '',//收货人手机号
    region: [],//省市县
    address: '',  //详细地址 
    showAddress: 0,
    showbag: false,
    bagMoney: '',
    gonglue: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading()
    let that = this;
    let smallopenid = app.globalData.openId;
    that.setSecond();
    let fn = msg => {

      that.setData({
        range: msg.data.seq

      })
    }
    app.api("/getseq", { smallopenid: smallopenid }, fn)
  },
  onPullDownRefresh: function () {
    let that = this;
    that.onLoad()

    wx.stopPullDownRefresh()
  },

  // 显示攻略
  changegonglue: function () {
    let that = this;
    that.setData({
      gonglue: !that.data.gonglue
    })
  },
  //设置活动时间
  setSecond: function () {
    let that = this;
    var starSecond = Date.parse(new Date("2018-05-10 18:00:00".replace(/-/g, "/"))) / 1000 - Date.parse(new Date()) / 1000;
    var endSecond = Date.parse(new Date('2018-5-13 00:00:00'.replace(/-/g, "/"))) / 1000 - Date.parse(new Date()) / 1000;
    that.setData({
      starSecond: starSecond,
      endSecond: endSecond
    })

  },
  //领取福袋
  lottery: function () {
    if (!this.checkStar()) {
      return false
    }
    let that = this;
    let fn = msg => {
      let returnMes = msg.data
      if (returnMes.redbagFlag.toString() === '1') {
        wx.showToast({
          title: '您已领过福袋',
          icon: 'none'
        })
      } else {
        that.setData({
          bagMoney: returnMes.redbagMoney,
          showbag: true
        })
      }
    }
    app.api("/getRedBagMoney", { smallopenid: app.globalData.openId }, fn)
  },
  //兑换奖品前五十
  acceptInput: function () {
    let that = this;
    if (that.endSecond < 0) {
      wx.showToast({
        title: '很抱歉，您与奖品擦肩而过，下次再来',
        icon: 'none'
      })
      return false;
    }
    let fn = msg => {
      wx.hideLoading()

      if (msg.data.result.toString() === '1') {
        //设置地址信息
        let data = msg.data;
        
        that.setData({
          name: data.name,//收货人姓名
          phone: data.mobile,//收货人手机号
          region: [data.region1, data.region2, data.region3],//省市县
          address: data.address,  //详细地址 
        })

      }
      that.changeShow();
    }
    app.api("/getAddress", { smallopenid: app.globalData.openId }, fn)
  },
  //上传收货信息
  storeAddress: function () {
    let that = this;
    let name = that.data.name;
    let phone = that.data.phone;
    let address = that.data.address;
    let data = {
      smallopenid: app.globalData.openId,
      region1: encodeURIComponent(that.data.region[0]),
      region2: encodeURIComponent(that.data.region[1]),
      region3: encodeURIComponent(that.data.region[2]),
      address: encodeURIComponent(address),
      mobile: phone,
      name: encodeURIComponent(name),
    }
    if (app.checkData('收货人姓名', name) && app.checkData('手机号', phone) && app.checkData('详细住址', address)) {
      wx.showLoading({
        title: '加载中',
      })
      let fn = msg => {
        wx.hideLoading()
        if (msg.data.result.toString() === '1') {
          that.changeShow();
        }
      }
      app.api("/storeAddress", data, fn)
    }
  },

  //输入姓名
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //输入手机
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //省市县
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  //输入地址
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  //显示隐藏地址
  changeShow: function () {
    let that = this;
    that.setData({
      showAddress: !that.data.showAddress
    })
  },
  //生成贺卡
  creatCard: function () {
    if (this.data.starSecond <= 0) {
      let num = Math.floor(Math.random() * 3 + 1)
      console.log(num);
      let url = `/pages/logs/logs?src=/images/hk_0${num}.jpg`;
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.showToast({
        title: '5月10日下午6点开通',
        icon: 'none'
      })
    }

  },
  //福袋开始时间
  checkStar: function () {
    let starSecond = Date.parse(new Date("2018-05-13 00:00:00".replace(/-/g, "/"))) / 1000 - Date.parse(new Date()) / 1000;
    if (starSecond > 0) {
      wx.showModal({
        title: '活动提示',
        content: '5月13日开福袋，期待中',
      })
      return false;
    } else {
      return true;
    }
  },

})