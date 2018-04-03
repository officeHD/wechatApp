
var app = getApp();
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    selectCurrent: 0,
    banners: [
      { picUrl: "../../images/banner01.png" },
      { picUrl: "../../images/banner02.png" }

    ],
    // 头条内容
    noticeList: {
      dataList: [
        { id: 1, title: "保险行业到底发生了什么", dataList: 'adf' }
      ]
    },
    //热门推荐
    hotsale: [
      { id: 1, title: "安邦安鑫利两全保险", dataList: '费用低廉，两全保障', pic: '../../images/sale1.png', detailurl: '' },
      { id: 2, title: "安邦安鑫利两全保险", dataList: '费用低廉，两全保障', pic: '../../images/sale2.png', detailurl: '' }
    ]
  },

  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击banner跳转
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  toDetailsTap: function (e) {
    let url = e.currentTarget.dataset.detailurl;
    if (url) {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "产品开发中",
        showCancel: false,
      })
    }

  },
  onLoad: function (options) {
    if (options.staffid) {
      wx.showToast({
        title: options.staffid,
      })
    }
    var that = this
    // that.getNotice();
    // that.getBanner();
  },
  // 分享按钮
  onShareAppMessage: function () {
    return {
      title: "民盛保代—用心服务每一位",
      path: '/pages/index/index?staffid=3',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  //获取banner图片
  // getBanner: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
  //     data: {
  //       key: 'mallName'
  //     },
  //     success: function (res) {
  //       if (res.data.code == 404) {
  //         wx.showModal({
  //           title: '提示',
  //           content: '请在后台添加 banner 轮播图片',
  //           showCancel: false
  //         })
  //       } else {
  //         that.setData({
  //           // banners: [{ picUrl:"../../images/banner01.jpg"}]
  //         });
  //       }
  //     }
  //   })
  // },
  //获取头条信息
  // getNotice: function () {
  //   var that = this;
  //   wx.request({
  //     url:  app.globalData.ctx + '/notice/list',
  //     data: { pageSize: 5 },
  //     success: function (res) {
  //       if (res.data.code == 0) {
  //         that.setData({
  //           // noticeList: res.data.data
  //         });
  //       }
  //     }
  //   })
  // }


})