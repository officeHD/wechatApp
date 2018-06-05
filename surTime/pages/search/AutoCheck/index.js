var app = getApp();
Page({
  data: {

    countryArr: [{ name: "美国", value: "US" }],
    country: 'US',
    index: 0,
    yearArr: [{ name: "2018年", value: '2018' }],
    year: '2018',
    yearIndex: 0,
    timeArr: [{ PNo: '0', MonthDay: '3月30号-3月30号 (已购买)' }],
    PNo: 0,
    timeIndex: 0,
    position: 'relative',
    flag: true,
    PageNum: 1,
    tips: '',
    length: "1",
    listData: []
  },
  onLoad: function () {
    let that = this;
    let UserID = app.globalData.PKID;
    let PNo = that.data.PNo;
    let cb = (res) => {
      let data = JSON.parse(res.data.d)

      if (data.State.toString() === "1") {
        let ReturnInfo = JSON.parse(data.ReturnInfo);
        let DataDropDownList = JSON.parse(ReturnInfo.DataDropDownList);
        let DataDt = JSON.parse(ReturnInfo.DataDt);

        let arr = [];
        let yearArr = [];
        let time = [];
        for (var i in DataDropDownList.selectcountry) {
          arr.push({ name: i, value: DataDropDownList.selectcountry[i] }); //属性
          //arr.push(object[i]); //值
        }

        for (var i in DataDropDownList.selectyear) {
          yearArr.push({ name: i, value: DataDropDownList.selectyear[i] })

        }

        for (var i in DataDropDownList.selectmouth) {
          time.push({ MonthDay: i, PNo: DataDropDownList.selectmouth[i] }); //属性
          //arr.push(object[i]); //值
        }

        that.setData({
          listData: DataDt,
          countryArr: arr,
          country: arr[0].value,
          yearArr: yearArr,
          year: yearArr[0].value,
          timeArr: time,
          PNo: time[0].PNo
        })
        that.GetPNoIsView();
      }
    }

    app.ajax('/AsinKeyAll', { UserID: UserID, PNo: PNo, RowsNum: 10,Asin:'' }, cb)
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    this.onLoad();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  demoLink: function () {
    wx.showModal({
      title: '提示',
      content: '演示数据',
    })
  },
  onReachBottom: function () {
    let that = this;
    if (that.data.length === 0) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return false;
    }
    this.AsinKeyAllByPage();
  },
  // 自动选品分页查询(下拉自动加载)
  AsinKeyAllByPage: function () {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      PNO: that.data.PNo,
      PageNum: that.data.PageNum,
      RowsNum: 10,
      Asin:''

    }
    let cb = res => {
      console.log(JSON.parse(res.data.d));

    }
    app.ajax('/AsinKeyAllByPage', data, cb)
  },
  //切换地区
  bindPickerChange: function (e) {
    let index = e.detail.value;
    let country = this.data.countryArr[index].value
    this.setData({
      index: index,
      country: country
    })
    this.getYear();
  },
  //切换年份 
  bindYearChange: function (e) {
    let index = e.detail.value;
    let year = this.data.yearArr[index].value
    this.setData({
      year: year,
      yearIndex: index
    })
    this.getMonth();
  },
  bindPickerChangeTime: function (e) {
    let index = e.detail.value;
    let PNo = this.data.timeArr[index].PNo;
    this.setData({
      timeIndex: index,
      PNo: PNo
    });
    this.GetPNoIsView();
  },

  //点击搜索
  searchBtn: function () {
    let that = this;
    wx.showLoading({
      title: '查询中',
     
      mask:true
    })
    that.UserIsValidRole(function (res) {
      wx.hideLoading();
      let result = JSON.parse(res.data.d);
      console.log(result)
      if (result.State.toString() === "1") {
        that.setData({
          listData: JSON.parse(result.ReturnInfo)
        })
      } else {
        wx.showModal({
          title: '查询提示',
          content: result.ReturnInfo,
          success: function () {
            if (result.State.toString() === "4") {
              that.UserAddRole()
            }

          }
        })
      }
    })
  },
  // 根据批次查询返回提示信息（当前用户如果已经查询过并且查询完成，直接显示Table）
  UserIsValidRole: function (cb) {
    let that = this;
    let data = {
      RowsNum:200,
      UserID: app.globalData.PKID,
      Asin:'',
      PNO: that.data.PNo
    }
    app.ajax('/UserIsValidRole', data, cb)
  },

  UserAddRole: function () {
    let that = this;
    let data = {
      RowsNum: 100,

      UserID: app.globalData.PKID,
      PNO: that.data.PNo
    }
    let cb = res => {
      let result = JSON.parse(res.data.d);
      that.setData({

        listData: that.data.listData.concat(JSON.parse(result.ReturnInfo)),
        page: that.data.page + 1,
        length: JSON.parse(data.ReturnInfo).length
      })
    }
    app.ajax('/UserAddRole', data, cb)
  },

  // 获取消费所扣T点提示信息
  GetPNoIsView: function () {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      PNO: that.data.PNo
    }
    let cb = res => {
      let ReturnInfo = JSON.parse(JSON.parse(res.data.d).ReturnInfo)
      that.setData({
        tips: ReturnInfo.Ttext
      })
    }
    app.ajax('/GetPNoIsView', data, cb)
  },
  getYear: function () {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      Country: that.data.country
    }
    let cb = res => {
      let data = JSON.parse(res.data.d)
      let ReturnInfo = JSON.parse(data.ReturnInfo);

      let yearArr = [];
      for (var i = 0; i < ReturnInfo.length; i++) {
        yearArr.push({ name: ReturnInfo[i].Year, value: ReturnInfo[i].Year })
      }
      that.setData({
        yearArr: yearArr,
        year: yearArr[0].value
      })
    }
    app.ajax('/GetYearByCountry', data, cb)
  },
  // 根据年获取月份（改变年份选择）
  getMonth: function () {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      Year: that.data.year,
      Country: that.data.country
    }
    let cb = res => {
      let data = JSON.parse(res.data.d)
      let ReturnInfo = JSON.parse(data.ReturnInfo);

      for (let i = 0; i < ReturnInfo.length; i++) {
        let datas = {
          UserID: app.globalData.PKID,
          PNO: ReturnInfo[i].PNo
        }
        app.ajax('/GetUserIsView', datas, function (res) {
          ReturnInfo[i].MonthDay = ReturnInfo[i].MonthDay + JSON.parse(res.data.d).ReturnInfo.replace(/"/g, "");
          that.setData({
            timeArr: ReturnInfo,
            PNo: ReturnInfo[0].PNo
          })
        })
      }
      that.setData({
        timeArr: ReturnInfo,
        PNo: ReturnInfo[0].PNo
      })
      console.log(that.data.timeArr)
    }
    app.ajax('/GetMouthByYear', data, cb)
  },
  checkDetail: function (e) {
    let pkid = e.currentTarget.dataset.pkid;
    wx.navigateTo({
      url: 'detail/index?pkid=' + pkid,
    })

  }

})