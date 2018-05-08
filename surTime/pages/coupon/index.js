// pages/coupon/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'left',
    couponList:[],
    rightList: [],
    centerList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let userData = JSON.parse(app.globalData.userData);
    
    this.GetCouponByUser(userData.PKID);
  },
  /**
   * 获取优惠券
   */
  GetCouponByUser: function (UserID) {
   let that=this;
    
    let fn = msg => {
      let res = JSON.parse(msg.data.d);
       if (res.State.toString()==="1"){
         that.setData({
           couponList: JSON.parse(res.ReturnInfo)
         })
         console.log(that.data.couponList)
       }
    }
    app.ajax('/GetCouponByUser', {
      UserID: UserID
    }, fn)
  }, searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    this.setData({
      active: target
     
    })
  }

})