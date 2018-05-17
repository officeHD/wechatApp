var app = getApp();
Page({
  data: {
    array: ['美国', '英国', '德国', '法国', '加拿大', '墨西哥', '日本', '西班牙', '意大利'],
    arrayval: ['US', 'UK', 'DE', 'FR', 'CA', 'MX', 'JP', 'ES', 'IT'],
    index: 0,
    year: '2018',
    month: '09-01',
    Country: 'us',
    position: 'relative',
    check: false,
    page: '1',
    flag: true,
    showChild: false,
    type: '',
    ASIN: '',
    listData: []
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      type: options.type
    })
    let UserID = app.globalData.PKID;
    let cb = (res) => {
      let data = JSON.parse(res.data.d)
      console.log(JSON.parse(data.ReturnInfo))
      that.setData({
        listData: JSON.parse(data.ReturnInfo),
        page: 2
      });
    }
    let data = {
      UserID: UserID,
      PageType: that.data.type,
      Page: '1',
      PageCount: '10'
    }
    app.ajax('/GetGKSKSTKMHistoryTableInPage', data, cb)
  },
  changeASIN: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      ASIN: value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      check: !this.data.check
    })
  },
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
      let data = JSON.parse(res.data.d)
      that.setData({
        listData: JSON.parse(data.ReturnInfo)
      });
    }
    let datas = {
      UserID: UserID,
      Country: Country,
      IsExpand: that.data.check,
      AsinList: '1-5',
      PageCount: '20',
      UserIpAddress: '',
      Asin: ASIN
    }
    app.ajax('/GKSKSTKMSubmit', datas, cb, 'POST')
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  //底部加载更多
  onReachBottom: function () {
    let that = this;
    console.log(that.data.page)
    if (that.data.page == 0) {
      wx.showToast({
        title: '已无更多',
        icon: 'none'
      });
      return false;
    }

    let data = {
      UserID: app.globalData.PKID,
      PageType: that.data.type,
      Page: that.data.page,
      PageCount: '10'
    }
    let cb = (res) => {
      let data = JSON.parse(res.data.d)
      let newList = JSON.parse(data.ReturnInfo);

      let page;
      if (!newList.length) {
        that.setData({
          page: 0,
        });
        return false;
      } else {
        page = that.data.page - 0 + 1
      }
      that.setData({
        listData: that.data.listData.concat(newList),
        page: page,
      });
    }
    app.ajax('/GetGKSKSTKMHistoryTableInPage', data, cb)
  },

  bindPickerChange: function (e) {
    let that = this;
    let index = e.detail.value;
    that.setData({
      index: index,
      country: that.data.arrayval[index]
    })
  },

  bindDateChange: function (e) {
    this.setData({
      month: e.detail.value
    })
  },
  bindYearChange: function (e) {
    this.setData({
      year: e.detail.value
    })
  },
  checkDetail: function (e) {
    let that = this;
    let pkid = e.currentTarget.dataset.pkid;
    let jindu = e.currentTarget.dataset.jindu;
    if (that.data.type === "KM") {
      if (jindu === "已完成") {
        that.GetSKSKSTKMData(pkid);
      } else if (jindu === "正在生成") {
        wx.showModal({
          title: '提示',
          content: '正在生成',
        })
      }
    } else {
      that.GetSKSKSTKMData(pkid);
    }
  },
  delList: function (e) {
    let that = this;
    let pkid = e.currentTarget.dataset.pkid;
    wx.showModal({
      title: '提示',
      content: '删除后无法恢复',
      success: function () {
        let data = {
          UserID: app.globalData.PKID,
          PageType: that.data.type,
          DataID: pkid,
          FileName: ""
        }
        wx.showLoading({
          title: '加载中',
          icon: 'none'
        })
        app.ajax('/DeleteGKSKSTKMTableByUser', data, function (res) {
          wx.hideLoading();
          let returnMes = JSON.parse(res.data.d)
          if (returnMes.State == 1) {
            wx.showModal({
              title: '提示',
              content: '删除成功',
            })
          } else {
            wx.showModal({
              title: '提示',
              content: returnMes.ReturnInfo,
            })
          }
        })
      }
    })
  },
  GetSKSKSTKMData: function (pkid) {
    let that = this;
    let data = { PageType: that.data.type, UserID: app.globalData.PKID, TDataID: pkid, Page: 1, PageCount: 10 };
    let fn = msg => {

      let resData = JSON.parse(msg.data.d);
      console.log(resData)
      console.log(JSON.parse(resData.RetDataTable))
      console.log(JSON.parse(resData.RetKeyTable))

      that.setData({
        showChild: true,
        RetDataTable:JSON.parse(resData.RetDataTable),
        RetKeyTable: JSON.parse(resData.RetKeyTable)
      })
    }
    app.ajax('/GetSKSKSTKMData', data, fn)
  },


  closeChild: function () {
    this.setData({
      showChild: false
    })
  }

})