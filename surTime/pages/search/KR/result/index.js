var app = getApp();

Page({
  data: {
    index: 0,
    position: 'relative',
    active: 'runing',
    flag: true,
    listData: [],
    runing: [],
    stop: [],
    finish: []
  },
  onLoad: function () {
    let that = this;
    let UserName = app.globalData.UserName;

    if (!UserName) {
      wx.showModal({
        title: '提示',
        content: '登录失效，请重新登录',
      })
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return false;
    } else {
      let data = {
        UserID: app.globalData.PKID,
        PlanID: 0,
        RuningPage: 1,
        StopPage: 1,
        CompletePage: 1,
        PageCount: 10
      }
      app.ajax('/SelectPlanInIM', data, function (res) {
        console.log(JSON.parse(res.data.d));
        let CompleteIMTable = JSON.parse(JSON.parse(res.data.d).CompleteIMTable);
        let RuningIMTable = JSON.parse(JSON.parse(res.data.d).RuningIMTable);
        let StopIMTable = JSON.parse(JSON.parse(res.data.d).StopIMTable);
        that.setData({
          listData: RuningIMTable,
          runing: RuningIMTable,
          stop: StopIMTable,
          finish: CompleteIMTable
        })
        console.log(CompleteIMTable)
      })
      that.setData({
        listData: app.globalData.runingData,
        runing: app.globalData.runingData,
        stop: app.globalData.stopData,
        finish: app.globalData.finishData,
      })
    }
  },
  searchType: function (e) {
    let that = this;
    let target = e.currentTarget.dataset.target;
    let data;
    if (target === "runing") {
      data = that.data.runing
    } else if (target === "stop") {
      data = that.data.stop;
    } else {
      data = that.data.finish
    }
    this.setData({
      active: target,
      listData: data
    })
  },
  //删除计划
  DelFileInfoInIM: function (e) {
    app.ajax('/SelectPlanInIM', data, fn)
  },
  // 停止监控
  SetStopInIM: function (e) {
    app.ajax('/SetStopInIM', data, fn)
  },
  //重新查询IM计划
  AgainImSearch: function () {
    app.ajax('/AgainImSearch', data, fn)
  },
  ViewCharInIM: function () {
    app.ajax('/ViewCharInIM', data, fn)
  }
})