//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    aidOpenId: '',//助力openId
    completejoinNum: '',//集齐总数
    bindingFlag: 0,//是否绑定手机号
    suscribe: 0,//是否关注公众号
    relationFlag: 0,//是否助力成功
    ownerNum: 0,//自己张数
    choiceNum: 0,//抽奖次数
    showsuscribe: 0,//显示关注模态框
    cardseq: 0,//是否已经合成
    combine: 0,
    starSecond: 1,
    showHelp: false,//显示好友助力
    isFirst: 0,
    imgsrc: `${app.globalData.url}/bg.png`,//花卡大图
    userInfo: {},
    hasUserInfo: false,
    gonglue: 0,
    isloginback: false,//从登陆页面返回

    cards: [
      { name: "1", num: "0", src: `${app.globalData.url}/huaka_01.png` },
      { name: "2", num: "0", src: `${app.globalData.url}/huaka_02.png` },
      { name: "3", num: "0", src: `${app.globalData.url}/huaka_03.png` },
      { name: "4", num: "0", src: `${app.globalData.url}/huaka_04.png` },
      { name: "5", num: "0", src: `${app.globalData.url}/huaka_05.png` },
      { name: "6", num: "0", src: `${app.globalData.url}/huaka_06.png` }
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
      console.log(options.openId);
    }
    
   
  },
  //页面显示
  onShow: function () {
    let starSecond = Date.parse(new Date("2018-05-10 18:00:00".replace(/-/g, "/"))) / 1000 - Date.parse(new Date()) / 1000;
    let that = this;
    wx.login({
      success: res => {
        if (res.code) {
           
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          app.globalData.userCode = res.code;
          // 获取用户信息
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.globalData.encryptedData = res.encryptedData;
              app.globalData.iv = res.iv;
             
              that.getUserData();
            },
            fail: function (res2) {
              // 在这里做一下兼容，有些同行业的用户会点击拒绝玩一玩看你们的小程序是否存在bug，  
              // 所以在这里还是加上下面这两行代码吧，打开微信小程序的设置，允许小程序重新授权的页面  
              wx.openSetting({
                success: (res) => {
                  // 下面的代码格式按照我的写，不要看工具打印的什么，在这里提醒大家一句，有时候不能相信开发者工具，因为  
                  // android和ios还有工具底层的js库是不同的，有些时候坑的你是一点脾气也没有，所以大家注意一下，  
                  // 不相信的慢慢的去自己跳坑吧  
                  if (res.authSetting["scope.userInfo"]) {
                    // 进入这里说明用户重新授权了，重新执行获取用户信息的方法  
                    that.getUserData()
                  }
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }

      },
      fail: res => {
        console.log(res);
      }

    })

    that.setData({
      starSecond: starSecond
    })
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
    wx.showLoading({
      title: '加载中'
    })
  
    let that = this;
    let code = '';
    if (!app.globalData.openId) {
      code = app.globalData.userCode
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
            { name: "1", num: returnMes.card1, src: `${app.globalData.url}/huaka_01.png` },
            { name: "2", num: returnMes.card2, src: `${app.globalData.url}/huaka_02.png` },
            { name: "3", num: returnMes.card3, src: `${app.globalData.url}/huaka_03.png` },
            { name: "4", num: returnMes.card4, src: `${app.globalData.url}/huaka_04.png` },
            { name: "5", num: returnMes.card5, src: `${app.globalData.url}/huaka_05.png` },
            { name: "6", num: returnMes.wanneng, src: `${app.globalData.url}/huaka_06.png` }
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
      title: '浓情五月集花献礼，赢豪礼开福袋 ',
      imageUrl: '/images/wechat_share.png',
      path: `/pages/index/index?openId=${app.globalData.openId}`,
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  lottery: function (e) {
    if (!this.checkEnd() || !this.checkStar()) {

      return false;
    }
    app.globalData.formid = e.detail.formId;
    let that = this;
    // that.starlottery();
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
            cardName = '粉郁金香'
            break;
          case "card3":
            cardName = '红风信子'
            break;
          case "card4":
            cardName = '报春花'
            break;
          case "card5":
            cardName = '粉康乃馨'
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
       
      }else{
        wx.showModal({
          title: '抽奖结果',
          content: `很遗憾，您与花卡擦肩而过。。。`
        })
      }
      that.getUserData()
    }
    app.api("/lottery", { smallopenid: app.globalData.openId, formid: app.globalData.formid }, fn)
  },
  combine: function () {
    if (!this.checkEnd()) {
      return false;
    }
    let that = this;
    wx.showLoading({
      title: '开始合成',
    })
    let fn = msg => {
      wx.hideLoading()
      if (msg.data.result.toString() === "1") {
        wx.showModal({
          title: '合成结果',
          content: `恭喜您完成集卡任务，请前往我的奖品页面查看兑奖详情。`
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
    let name = e.currentTarget.dataset.name;
    console.log(name)

    if (badge.toString() === "0") {
      imgsrc = "/images/index/bg.png";
      if (name.toString() === "5") {
        wx.showToast({
          title: '通过手机银行指定交易获得',
          icon: 'none'
        })
      }
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
    let that = this;
    if (this.checkStar()) {
      wx.showLoading({
        title: '加载中',
      })
      that.getUserData()
    }
   
    wx.stopPullDownRefresh()
  },
  checkStar: function () {
    let starSecond = Date.parse(new Date("2018-04-20 10:00:00".replace(/-/g, "/"))) / 1000 - Date.parse(new Date()) / 1000;
    //if (starSecond > 0) {
    //  wx.showModal({
    //   title: '活动提示',
    //   content: '活动于4月20号上午10点开始，您准备好了吗？',
    //  })
    // return false;
    //  } else {
    return true;
    //}
  },
  checkEnd: function () {
    let starSecond = Date.parse(new Date("2018-05-10 18:00:00".replace(/-/g, "/"))) / 1000 - Date.parse(new Date()) / 1000;
    if (starSecond < 0) {
      wx.showModal({
        title: '活动提示',
        content: '活动已结束，敬请期待下次活动通知',
      })
      return false;
    } else {
      return true;
    }
  },
  changeSuscribe: function () {
    this.setData({
      showsuscribe: 0
    })
  }
})
