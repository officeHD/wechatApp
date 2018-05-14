//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    login: false,
    navbar: [
      {
        className: 'navlist active', name: '用户中心', navgator: [
          { url: "/pages/user/index", name: "套餐充值" }

        ]
      },
      {
        className: 'navlist active', name: '数据揭秘', navgator: [
          { url: "/pages/search/A9/index", name: "A9工具" },
          { url: "/pages/search/AutoCheck/index", name: "自动选品" },
          { url: "/pages/search/GKSKST/index", name: "GK SK ST 综合查询" },
        ]
      },
      {
        className: 'navlist', name: ' 关键词规划', navgator: [
          { url: "/pages/search/GKSKSTKM/index?type=GK", name: "GK 工具" },
          { url: "/pages/search/GKSKSTKM/index?type=SK", name: "SK 工具" },
          { url: "/pages/search/GKSKSTKM/index?type=ST", name: "ST 工具" },
          { url: "/pages/search/GKSKSTKM/index?type=KM", name: "KM 工具" }
        ]
      },
      {
        className: 'navlist', name: '李思婷实验室', navgator: [
          { url: "/pages/search/IM/index", name: "IM 工具" },
          { url: "", name: "DE 工具" },
          { url: "/pages/search/KR/index", name: "KR 工具" }
        ]
      },
      {
        className: 'navlist', name: '卖家配套服务', navgator: [
          { url: "/pages/album/index", name: "图片专用空间" },
          { url: "", name: "亚马逊FBA升仓扩容" }
        ]
      },
      {
        className: 'navlist', name: '极速建站', navgator: [
          { url: "", name: "MB 工具" }

        ]
      },
      {
        className: 'navlist', name: '做任务领T点', navgator: [
          { url: "/pages/work/center/index", name: "任务中心" },
          { url: "/pages/work/list/index", name: "任务列表" }

        ]
      }
     
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  toPage: function (e) {
    let url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请在PC端打开',
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  onShow: function () {
    let that = this;
    let UserName = app.globalData.UserName;
    if (UserName) {
      that.setData({
        login: true
      })
    } else {
      that.setData({
        login: false
      })
    }
  },
  //退出登录
  takeOut: function () {
    let that = this;
    wx.showModal({
      title: '退出提示',
      content: '确认退出？',
      success: function () {
        wx.clearStorageSync();
        app.globalData.PKID = '';
        app.globalData.UserName = '';
        app.globalData.Tel = '';
        that.setData({
          login: false
        })
      }
    })

  },
  clickCurrent: function (e) {
    let index = e.currentTarget.dataset.index
    var navbar = this.data.navbar;
    navbar.map((item, index) => { item.className = "navlist" })
    navbar[index].className = "navlist active";
    //更新列表的状态
    this.setData({
      navbar: navbar
    });
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
