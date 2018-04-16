//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    aidOpenId: '',//助力openId
    completejoinNum: '',//集齐总数
    bindingFlag: '',//是否绑定手机号
    suscribe: 0,//是否关注公众号
    relationFlag: 0,//是否助力成功
    ownerNum: 0,//自己张数
    choiceNum: 0,//抽奖次数
    showsuscribe: 0,//显示关注模态框
    cardseq: 0,//是否已经合成
    combine: 0,
    showHelp: false,//显示好友助力
    isFirst: 0,
    imgsrc: '/images/index/bg.png',//花卡大图
    userInfo: {},
    hasUserInfo: false,
    gonglue: 0,
    isloginback: false,//从登陆页面返回

    cards: [
      { name: "1", num: "0", src: "/images/index/huaka_01.png" },
      { name: "2", num: "0", src: "/images/index/huaka_02.png" },
      { name: "3", num: "0", src: "/images/index/huaka_03.png" },
      { name: "4", num: "0", src: "/images/index/huaka_04.png" },
      { name: "5", num: "0", src: "/images/index/huaka_05.png" },
      { name: "6", num: "0", src: "/images/index/huaka_06.png" }
    ]
  },
//页面加载
  onLoad: function (options) {
    let that = this;
    // 如果有openId就是分享的
    if (options.openId) {
      that.setData({
        aidOpenId: options.openId
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    app.getUserInfo(function(){
      that.getUserData();
    })
    wx.hideLoading()
  },
  //页面显示
  onShow: function () {
    let that = this;
    // 如果从注册页过来就直接开奖
    if (that.data.isloginback) {
      that.starlottery();
      that.setData({
        isloginback: false
      })
    }
  },
  //获取用户信息
  getUserData: function () {
    let that = this;
    let code = app.globalData.code;
    if (app.globalData.openId){
      code='';
    } 
    if (!app.globalData.userInfo){
      app.getUserInfo();
    }
    let data = {
      smallopenid: app.globalData.openId,
      aidOpenId: that.data.aidOpenId,
      code: code,
      encryptedData: app.globalData.encryptedData,
      iv: app.globalData.iv
    }
    let fn = msg => {
      wx.hideLoading()
      let returnMes = msg.data
      if (returnMes.result.toString() === "1") {
        wx.setStorage({
          key: "openId",
          data: returnMes.openid
        })
        app.globalData.openId = returnMes.openid;
        that.setData({
          suscribe: returnMes.suscribe,//关注公众号
          bindingFlag: returnMes.bindingFlag,//绑定手机号
          relationFlag: returnMes.relationFlag,//是否助力成功
          choiceNum: returnMes.choiceNum,//剩余抽奖次数
          completejoinNum: returnMes.completejoinNum,// 完成人数
          cardseq: returnMes.cardseq,//是否合成
          ownerNum: returnMes.ownerNum,  //自己张数
          cards: [
            { name: "1", num: returnMes.card1, src: "/images/index/huaka_01.png" },
            { name: "2", num: returnMes.card2, src: "/images/index/huaka_02.png" },
            { name: "3", num: returnMes.card3, src: "/images/index/huaka_03.png" },
            { name: "4", num: returnMes.card4, src: "/images/index/huaka_04.png" },
            { name: "5", num: returnMes.card5, src: "/images/index/huaka_05.png" },
            { name: "6", num: returnMes.wanneng, src: "/images/index/huaka_06.png" }
          ]
        })
        let cardArr = [returnMes.card1, returnMes.card2, returnMes.card3, returnMes.card4, returnMes.card5, returnMes.wanneng].filter(num => num - 0 > 0);
        if (cardArr.length >= 5) {
          that.setData({
            combine: 1
          })
        }
      }
    }
    app.api("/getUserData", data, fn)
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '浓情五月集花献礼，开福袋赢好礼',
      imageUrl: '/images/index/bg.png',
      path: `/pages/index/index?openId=${app.globalData.openId}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  lottery: function () {
    let that = this;
    // that.getUserData();
    //如果没有关注提示关注
    if (that.data.suscribe.toString() === '0') {
      that.setData({
        showsuscribe: 1
      })
      return false;
    }
    //未绑定手机号
    if (that.data.bindingFlag.toString() === '0') {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    } else if (that.data.choiceNum < 1) {
      that.setData({
        showHelp: true
      })
    } else {
      that.starlottery();
    }
  },

  // 显示攻略
  changegonglue: function () {
    let that = this;

    that.setData({
      gonglue: !that.data.gonglue
    })
  },
  starlottery: function () {
    let that = this;
    wx.showLoading({
      title: '开始抽奖',
    })
    let fn = msg => {
      wx.hideLoading()
      if (msg.data.result.toString() === "1") {
        let cardType = msg.data.cardType;
        let cardName;
        switch (cardType) {
          case "card1":
            cardName = '粉绣球'
            break;
          case "card2":
            cardName = '郁金香'
            break;
          case "card3":
            cardName = '风信子'
            break;
          case "card4":
            cardName = '报春花'
            break;
          case "card5":
            cardName = '康乃馨'
            break;
          case "card6":
            cardName = '万能花卡'
            break;
          default:
            break
        }
        wx.showModal({
          title: '抽奖结果',
          content: `恭喜您抽中了${cardName}`
        })
        that.getUserData()
      }
    }
    app.api("/lottery", { smallopenid: app.globalData.openId }, fn)
  },
  combine: function () {
    let that = this;
    wx.showLoading({
      title: '开始合成',
    })
    let fn = msg => {
      wx.hideLoading()
      if (msg.data.result.toString() === "1") {
        wx.showModal({
          title: '合成结果',
          content: `恭喜您合成成功`
        })
        that.getUserData()
      }
    }
    app.api("/compose", { smallopenid: app.globalData.openId }, fn)
  },
  changeShow: function () {
    let that = this;
    if (that.data.choiceNum < 1) {
      that.setData({
        showHelp: false
      })
    }
  },
  //查看花卡
  clickNum: function (e) {
    let imgsrc = e.currentTarget.dataset.src;
    let badge = e.currentTarget.dataset.badge;
    if (badge.toString() === "0") {
      imgsrc = "/images/index/bg.png";
    }
    this.setData({
      imgsrc: imgsrc
    })
  },
  //跳转Tab
  tonotice: function () {
    wx.switchTab({
      url: '/pages/notice/index'
    })
  },
  toIndex: function () {
    let that = this;

    //如果没有关注提示关注
    that.setData({
      relationFlag: 0
    })
    wx.switchTab({
      url: '/pages/index/index'
    })
    // that.getUserData();
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getUserData();
    wx.stopPullDownRefresh()
  },
  changeSuscribe: function () {
    this.setData({
      showsuscribe: 0
    })
  }
})
