var app = getApp();
Page({
  data: {
    array: ['美国', '英国', '德国', '法国', '加拿大', '墨西哥', '日本', '西班牙', '意大利'],
    arrayval: ['US', 'UK', 'DE', 'FR', 'CA', 'MX', 'JP', 'ES', 'IT'],
    page: 1,
    index: 0,
    Country: 'us',
    flag: true,
    ASIN: '',
    OldData: '',
    length: 1,
    listData: []
  },
  onLoad: function () {
    let that = this;
    let UserID = app.globalData.PKID;

    let sendData = {
      UserID: UserID,
      Page: 1,
      PageCount:200,
      Asin: '',
      StrTime: '',
      EndTime: ''
    }
    let cb = (res) => {
      let data = JSON.parse(res.data.d);
     // console.log(JSON.parse(data.ReturnInfo))
      that.setData({
        listData: JSON.parse(data.ReturnInfo),
        page: 2,
      });
    }
    app.ajax('/PlannerKeyAllByPage', sendData, cb)
  },
  getA9List: function () {
    let that = this;
    let UserID = app.globalData.PKID;

    let sendData = {
      UserID: UserID,
      Page: that.data.page,
      PageCount:200,
      Asin: '',
      StrTime: '',
      EndTime: ''
    }
    let cb = (res) => {
      let data = JSON.parse(res.data.d);
     // console.log(JSON.parse(data.ReturnInfo))
      let ReturnInfo=JSON.parse(data.ReturnInfo);
      if (!ReturnInfo || !ReturnInfo.length) {
        return false;
      };

      that.setData({
        listData: that.data.listData.concat(JSON.parse(data.ReturnInfo)),
        page: that.data.page + 1,
        length: JSON.parse(data.ReturnInfo).length
      });
    }
    app.ajax('/PlannerKeyAllByPage', sendData, cb)
  },
  //A9查询
  search: function () {
    let that = this;
    let UserID = app.globalData.PKID
    let Country = that.data.Country;
    let ASIN = that.data.ASIN;

    if (!ASIN) {
      wx.showToast({
        title: '请输入ASIN',
        icon: "none"
      })
      return;
    }
    let cb = (res) => {
      wx.hideLoading();
      that.getUserInfo();
      let data = JSON.parse(res.data.d)
      if (data.State.toString() === '1') {
        that.addAsin(UserID, Country, ASIN, that.data.OldData)
      } else if (data.State.toString() === '4') {
        that.setData({
          OldData: data.ReturnInfo
        })
      } else if (data.State.toString() === '2') {
        wx.showToast({
          title: data.ReturnInfo,
          icon: 'none'
        })
        return false;
      } else {
        wx.showModal({
          title: '查询提示',
          content: '存在旧数据，是否重新查询',
        })
      }
      
     

    }
    wx.showLoading({
      title: '加载中',
      icon: 'none',
      mask:true
    });
    app.ajax('/PlannerAsinIsExists', { UserID: UserID, Country: Country, Asin: ASIN }, cb, 'POST')

  },
  // 增加A9查询信息
  addAsin: function (UserID, Country, ASIN, OldData) {
    let that = this;
    let cb = (res) => {
      wx.hideLoading();
      let data = JSON.parse(res.data.d)
      wx.showToast({
        title: data.ReturnInfo,
        icon: 'none'
      })
      that.getUserInfo();
      that.onLoad();
    }
    wx.showLoading({
      title: '加载中',
      icon: 'none',
      mask:true
    });
    app.ajax('/PlannerAddAsin', { UserID: UserID, Country: Country, Asin: ASIN, OldData: OldData }, cb)
  },
  getUserInfo: function () {
    let fn = msg => {
      let ret = JSON.parse(msg.data.d);
      app.initUserInfo(JSON.parse(ret.ReturnInfo));
      app.initUserData(ret.ReturnInfo);
    }
    app.ajax('/GetUserInfo', { Openid: app.globalData.openId }, fn)
  },
  /**
  * 下拉刷新
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  //加载更多
  onReachBottom: function () {
    let that = this;
    if (that.data.length === 0) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return false;
    }
    this.getA9List();
  },
  changeASIN: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      ASIN: value
    })
  },
  bindPickerChange: function (e) {
    let that = this;
    let index = e.detail.value;

    that.setData({
      index: index,
      country: that.data.arrayval[index]
    })
  },

  checkDetail: function (e) {
    let pkid = e.currentTarget.dataset.pkid;
    let state = e.currentTarget.dataset.state;
    if (state === "4") {
      wx.navigateTo({
        url: 'detail/index?pkid=' + pkid,
      })
    } else if (state === "5") {
      wx.showModal({
        title: '提示',
        content: '数据已失效',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '正在查询中，最终完成可能需要5-30分钟（与子ASIN数量有关），请耐心等待!!',
      })
    }

  }


})