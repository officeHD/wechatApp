// pages/coupon/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:false,
    active: 'left',
    couponList: [],
    rightList: [],
    centerList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    if (options.type){
      this.setData({
        type:true
      })
    }
    let userData = JSON.parse(app.globalData.userData);
   
    this.GetCouponByUser(userData.PKID);
  },
  /**
   * 获取优惠券
   */
  GetCouponByUser: function (UserID) {
    let that = this;
    let fn = msg => {
      let res = JSON.parse(msg.data.d);
      if (res.State.toString() === "1") {
        let resultArr = JSON.parse(res.ReturnInfo)
        console.log(resultArr)
        that.setData({
          couponList: resultArr.filter((item) => item.CouponType==="1"),
          rightList: resultArr.filter((item) => item.CouponType === "2"),
          centerList:  resultArr.filter((item) => item.CouponType === "3")
        })

      }
    }
    app.ajax('/GetCouponByUser', {
      UserID: UserID
    }, fn)
  },
  searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    this.setData({
      active: target
    })
  },
  useCard: function (e) {
    let that=this;
    if(!that.data.type){
      wx.showModal({
        title: '提示',
        content: '请在支付时使用',
      })
      return false;
    }
    let carData = e.currentTarget.dataset.data;
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      CouponType: 2,
      DiscountType: carData.CouponType,
      Amount: carData.Amount,
      Discount: carData.Discount,
    });
    wx.navigateBack({

    })
  }
  })