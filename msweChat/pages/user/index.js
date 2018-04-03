var app = getApp()
Page({
  data: {
    userInfo: {
    },
    staffInfo: {
      branchname: "督训区",
      position: "分部经理",
      money: 10000,
      fee: 3000
    },
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../images/shop.png',
      linkurl: '',
      text: '我的微店',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/ziliao.png',
      text: '我的资料',
      linkurl: './userfile/index',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '../../images/shoucang.png',
      text: '我的收藏',
      linkurl: '',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../images/apply.png',
      linkurl: '',
      text: '申请专业代理人'
    }, {
      icon: '../../images/friend.png',
      linkurl: '',
      text: '邀请好友'
    }, {
      icon: '../../images/suggest.png',
      linkurl: './suggest/index',
      text: '投诉建议'
    }, {
      icon: '../../images/suggest.png',
      linkurl: './set/index',
      text: '设置'
    }]
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (!that.data.staffid) {
      wx.getStorage({
        key: 'staffid',
        success: function (res) {
          that.setData({
            staffid: res.data
          });
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  //拨打电话
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '4008802177',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  toDetailsTap: function (e) {
    let url = e.currentTarget.dataset.detailurl;
    if (url) {
      if (!this.data.staffid) {
        url = "../login/index"
      }
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

  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            });
          }
        })
      }
    })
  },
})