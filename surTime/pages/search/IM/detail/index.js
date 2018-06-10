import * as echarts from '../../../../ec-canvas/echarts';
var app = getApp();

Page({
  data: {
    index: 0,
    position: 'relative',
    active: 'runing',
    canvasShow: false,
    lineData: [],//折线图数据
    ec: {
      lazyLoad: true
    },
    flag: true,
    listData: [],
    runing: [],
    stop: [],
    finish: []
  },
  onLoad: function () {
    let that = this;
    let UserName = app.globalData.UserName;
    that.ecComponent = that.selectComponent('#mychart-dom-bar');
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
      that.SelectPlanInIM();
    }
  },
  SelectPlanInIM: function () {
    let that = this;
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
      if (that.data.active === "runing") {
        that.setData({
          listData: RuningIMTable
        })
      } else if (that.data.active === "stop") {
        that.setData({
          listData: StopIMTable
        })
      } else {
        that.setData({
          listData: CompleteIMTable
        })
      }
      that.setData({
        listData: RuningIMTable,
        runing: RuningIMTable,
        stop: StopIMTable,
        finish: CompleteIMTable
      })
      console.log(RuningIMTable)

    })
    // that.setData({
    //   listData: app.globalData.runingData,
    //   runing: app.globalData.runingData,
    //   stop: app.globalData.stopData,
    //   finish: app.globalData.finishData,
    // })
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
    let id = e.currentTarget.dataset.id;
    let data = {
      PlanAsinID: id

    }
    let fn = msg => {
      wx.hideLoading();
      if (JSON.parse(msg.data.d).State === 1) {
        wx.showModal({
          title: '提示',
          content: '删除成功',
        })
        this.SelectPlanInIM();
      }
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          app.ajax('/DelFileInfoInIM', data, fn)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 停止监控
  SetStopInIM: function (e) {

    let id = e.currentTarget.dataset.id-0;

    let data = {
      Asin_ID: id,
      UserID: app.globalData.PKID
    }
    let fn = msg => {
      wx.hideLoading();
      if (JSON.parse(msg.data.d).State === 1) {
        wx.showModal({
          title: '提示',
          content: '已停止',

        })
        this.SelectPlanInIM();
      }
    }
    wx.showModal({
      title: '提示',
      content: '确定要停止任务？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          app.ajax('/SetStopInIM', data, fn)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //重新查询IM计划
  AgainImSearch: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    let data = {
      ImPaPKID: id,
      UserID: app.globalData.PKID,
      UserIPAddress: '',

      StopPage: 1,
      CompletePage: 1,
      PageCount: 200
    }
    let fn = msg => {
      wx.hideLoading();
      if (JSON.parse(msg.data.d).State === 1) {
        wx.showModal({
          title: '提示',
          content: '查询成功',
        })
        this.SelectPlanInIM();
      }
    }

    wx.showModal({
      title: '提示',
      content: '确定要重新查询？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          app.ajax('/AgainImSearch', data, fn)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  ViewCharInIM: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let asin = e.currentTarget.dataset.asin;
    let sName = e.currentTarget.dataset.sname;
    let data = {
      PKID: id,
      UserID: app.globalData.PKID,
      ASIN: asin,
      SName: sName

    }
    let fn = msg => {
      wx.hideLoading();
      that.changeCanvas();
      let option = {
        color: ['rgb(124, 181, 236)', 'rgb(67, 67, 72)', 'rgb(144, 237, 125)'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['库存数据', '销量数据', '销售数据']
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [
          { x: 'center', type: 'value' }
        ],
        series: [
          { name: '库存数据', type: 'line', smooth: true, data: [] },
          { name: '销量数据', type: 'line', smooth: true, data: [] },
          { name: '销售数据', type: 'line', smooth: true, data: [] }
        ]
      };

      let yk2 = (JSON.parse(msg.data.d).XTime);
      let data2 = JSON.parse(msg.data.d).Y1KuCun;
      let ykeys2 = JSON.parse(msg.data.d).Y2XiaoLiang;
      let color2 = JSON.parse(msg.data.d).yy3xiao;

      option.xAxis.data = yk2;
      option.series[0].data = data2;
      option.series[1].data = ykeys2;
      option.series[2].data = color2;


      that.init(option)
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    app.ajax('/ViewCharInIM', data, fn)
  },
  // 点击按钮后初始化图表
  init: function (option) {
    this.ecComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption(option)
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })


  },
  changeCanvas: function () {
    let that = this;
    that.setData({
      canvasShow: !that.data.canvasShow
    })
  }
})