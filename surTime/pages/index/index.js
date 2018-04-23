//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbar: [
      {
        className: 'navlist active', name: '用户中心', navgator: [
          { url: "/pages/login/index", name: "登录" },
          { url: "/pages/register/index", name: "注册" }
        ]
      },
      {
        className: 'navlist', name: 'ASIN黑客数据揭秘', navgator: [
          { url: "/pages/search/A9/index", name: "A9工具(真实数据解密)" },
          { url: "/pages/search/AutoCheck/index", name: "自动选品(最具潜力TOP)" }
        ]
      },
      {
        className: 'navlist', name: '亚马逊关键词规划师', navgator: [
          { url: "/pages/search/GKSKSTKM/index?type=GK", name: "GK 工具(竞品流量入口)" },
          { url: "/pages/search/GKSKSTKM/index?type=SK", name: "SK 工具(关联流量入口)" },
          { url: "/pages/search/GKSKSTKM/index?type=ST", name: "ST 工具(Search Terms)" },
          { url: "/pages/search/GKSKSTKM/index?type=KM", name: "KM 工具(扩展关键词)" }
        ]
      },
      {
        className: 'navlist', name: '亚马逊李思婷实验室', navgator: [
          { url: " ", name: "IM 工具(监控竞品销量)" },
          { url: " ", name: "DE 工具(描述编辑器)" },
          { url: "/pages/search/KR/index", name: "KR 工具(关键词排名)" }
        ]
      },
      {
        className: 'navlist', name: '亚马逊卖家配套服务', navgator: [
          { url: "/pages/album/index", name: "专用图片空间" },
          { url: "", name: "亚马逊FBA升仓扩容" }
        ]
      },
      {
        className: 'navlist', name: '1小时极速建站大师', navgator: [
          { url: "", name: "MB 工具" }

        ]
      },
      {
        className: 'navlist', name: '做任务免费领T点', navgator: [
          { url: "", name: "任务中心" },
          { url: "", name: "进行中的任务" },
          { url: "", name: "退回的任务" },
          { url: "", name: "已完成的任务" }
        ]
      }
      // ,
      // {
      //   className: 'navlist', name: '管理员', navgator: [
      //     { url: "/pages/login/index", name: "登录" },
      //     { url: "/pages/register/index", name: "注册" },
      //     { url: "/pages/user/index", name: "个人中心" }
      //   ]
      // }
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
