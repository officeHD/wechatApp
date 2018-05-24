// pages/coupon/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: false,
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
    if (options.type) {
      this.setData({
        type: true
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
        let resultArr = JSON.parse(res.ReturnInfo);
        for (var i = 0; i < resultArr.length; i++) {
          // console.log(resultArr[i].StartTime)
          let data = resultArr[i].StartTime;
          let endDay = that.getDateAfter_n(data, resultArr[i].ValidDay)
          resultArr[i].endDay = endDay;
        }
        console.log(resultArr)
        that.setData({
          couponList: resultArr.filter((item) => item.CouponType === "1"),
          rightList: resultArr.filter((item) => item.CouponType === "2"),
          centerList: resultArr.filter((item) => item.CouponType === "3")
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
    let that = this;
    if (!that.data.type) {
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
  },
  getDateAfter_n: function (initDate, days) {

    if (!days) {
      return initDate;
    }
    // initDate = initDate.replace(/-/g, '');

    var date;
    var year = initDate.substring(0, 4);
    var month = initDate.substring(4, 6);
    var day = initDate.substring(6, 8);
    date = new Date(initDate); // 月份是从0开始的  
    date.setDate(date.getDate() + days);

    var yearStr = date.getFullYear();
    var monthStr = ("0" + (date.getMonth() + 1)).slice(-2, 8); // 拼接2位数月份  
    var dayStr = ("0" + date.getDate()).slice(-2, 8); // 拼接2位数日期  
    var hourStr = ("0" + date.getHours()).slice(-2, 8);
    var minStr = ("0" + date.getMinutes()).slice(-2, 8);
    var secStr = ("0" + date.getSeconds()).slice(-2, 8);
    var result = "";
    result = `${yearStr}-${monthStr}-${dayStr} ${hourStr}:${minStr}:${secStr}`;
    return result;
  }
})