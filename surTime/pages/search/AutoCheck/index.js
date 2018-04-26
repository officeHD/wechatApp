var app = getApp();
Page({
  data: {
    array: ['美国', '中国', '巴西', '日本', '印度尼西亚'],
    yearArr: ['2018'],
    index: 0,
    time: ["3月30号-3月30号 (已购买)"],
    PNo: '0',
    timeIndex: 0,
    year: '2018',
    Country: '美国',
    position: 'relative',
    flag: true,
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
        let array = [];
        let time = [];
        let yearArr = [];
        for (var i in DataDropDownList.selectcountry) {
          array.push(i); //属性
          //arr.push(object[i]); //值
        }
        for (var i in DataDropDownList.selectmouth) {
          time.push(i); //属性
          //arr.push(object[i]); //值
        }
        for (var i in DataDropDownList.selectyear) {
          yearArr.push(DataDropDownList.selectyear[i]); //属性
          //arr.push(object[i]); //值
        }
        console.log(DataDropDownList)
        that.setData({
          listData: DataDt,
          array: array,
          yearArr: yearArr,
          time: time
        })
      }
    }
    app.ajax('/AsinKeyAll', { UserID: UserID, PNo: PNo, RowsNum: 10 }, cb, 'POST')
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

  onReachBottom: function () {
    let that = this;
    let cb = (res) => {
      that.setData({
        listData: that.data.listData.concat(res.data.list)
      });
    }
    // app.ajax('/productList', '', cb, 'POST')
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangeTime: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      month: e.detail.value
    })
  },
  bindYearChange: function (e) {
    let that = this;
    let UserID = app.globalData.PKID;
    let year = e.detail.value;
    let Country = this.data.Country;
    console.log(year);
    this.setData({
      year: year
    })
    let cb = (res) => {
      let data = JSON.parse(res.data.d)

      that.setData({
        listData: JSON.parse(data.ReturnInfo)
      });
    }
    app.ajax('/GetMouthByYear', { UserID: UserID, Year: year, Country: Country }, cb, 'POST')
  },

})