var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Amount: '',
    CouponType: '',
    DiscountType: '',
    type: 1,
    current: '',
    Discount: 0,//优惠
    discountLabel: "请选择",
    add_show: false,
    carCode: '',
    config: [
      {
        src: '入门级',
        price: "100",
        value: "100点",
        single: "(1.00元/T)",
        A9: "200元/ASIN",
        auto: "200元/周期",
        gk: "4.00元/ASIN",
        type: 1
      },
      {
        src: '基础级',
        price: "300",
        value: "350点",
        single: "(0.86元/T)",
        A9: "172元/ASIN",
        auto: "172元/周期",
        gk: "3.44元/ASIN",
        type: 2
      },
      {
        src: '标准级',

        price: "600",
        value: "800点",
        single: "(0.75元/T)",
        A9: "150元/ASIN",
        auto: "150元/周期",
        gk: "3.00元/ASIN",
        type: 3
      },
      {
        src: '专业级',
        price: "1200",
        value: "2000点",
        single: "(0.60元/T)",
        A9: "120/ASIN",
        auto: "120元/周期",
        gk: "2.4元/ASIN",
        type: 4
      },
      {
        src: '企业级',
        price: "2400",
        value: "3000点",
        single: "(0.48元/T)",
        A9: "96元/ASIN",
        auto: "96元/周期",
        gk: "1.72元/ASIN",
        type: 5
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.type)
    let current = that.data.config.filter((item) => item.type == options.type);
    if (options.type) {
      that.setData({
        current: current[0]
      })
    }
     
  },
  onShow() {
    let that = this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    console.log(currPage.data)
    // that.setData({//将携带的参数赋值
    //   address: currPage.data.item
    // });

  },
  selectDiscount: function () {
    wx.navigateTo({
      url: '/pages/coupon/index?type=pay',
    })
  },
  changeShow: function () {
    let that = this;
    that.setData({
      add_show: !that.data.add_show
    })
  },
  changename: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      carCode: value
    })
  },
  sure_add: function () {
    let that = this;
    let fn = msg => {
      console.log(msg)
      let res=JSON.parse(msg.data.d)
      if(res.State==1){
       // do something...
      }else{
        wx.showModal({
          title: '提示',
          content: res.ReturnInfo,
        })
      }
    }
    app.ajax('/CouponValid', { textCoupon: that.data.carCode }, fn)
  },
  GetPayImg:function(){
    let that=this;
    let data={
      paymoney: that.data.current.price,
      paytype: "W01", //支付宝：A01 微：W01
      Coupon: "",//优惠券代码没有传值：“”
      UserID: app.globalData.PKID,//
      CouponType: 0,//1.固定优惠券代码 2.用户绑定优惠券 （两者都没有传0） 
      DiscountType: '',//1.折扣券 2.满减券 3.抵扣券 （优惠券类型1的情况下，传0）
      Amount: 0,//要求金额
      Discount: 0//满减金额or折扣率or抵扣金额

    }
    let fn=msg=>{
      console.log(JSON.parse(msg.data.d))
    }
    app.ajax('/GetPayImg', data, fn)
  }

})