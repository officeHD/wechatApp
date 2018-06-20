import * as echarts from '../../../../ec-canvas/echarts';
var app = getApp();

Page({
  data: {

    active: 'runing',
    flag: true,
    canvasShow: false,
    lineData: [],//折线图数据
    ec: {
      lazyLoad: true
    },
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


      that.SelectPlanInKey();
    }
  },
  SelectPlanInKey: function (cb) {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      PlanID: 0,
      RuningPage: 1,
      StopPage: 1,
      CompletePage: 1,
      PageCount: 20
    }
    app.ajax('/SelectPlanInKey', data, function (res) {
      let CompleteIMTable = JSON.parse(JSON.parse(res.data.d).CompleteKRTable);
      let RuningIMTable = JSON.parse(JSON.parse(res.data.d).RuningKRTable);
      let StopIMTable = JSON.parse(JSON.parse(res.data.d).StopKRTable);
      // console.log(JSON.parse(res.data.d));
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
        runing: RuningIMTable,
        stop: StopIMTable,
        finish: CompleteIMTable
      })
    })

    // that.setData({

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
  DelFileInfoInKeyPlan: function (e) {

    let id = e.currentTarget.dataset.id;
    let data = {
      AsinKeyID: id,
      UserID: app.globalData.PKID
    }
    let fn = msg => {
      wx.hideLoading();
      if (JSON.parse(msg.data.d).State === 1) {
        wx.showModal({
          title: '提示',
          content: '删除成功',
        })
        this.SelectPlanInKey();
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
          app.ajax('/DelFileInfoInKeyPlan', data, fn)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

  },
  // 停止监控
  SetStopInKeyPlan: function (e) {
    let id = e.currentTarget.dataset.id;
    let data = {
      PlanID: id,
      UserID: app.globalData.PKID
    }
    let fn = msg => {
      wx.hideLoading();
      if (JSON.parse(msg.data.d).State === 1) {
        wx.showModal({
          title: '提示',
          content: '已停止',

        })
        this.SelectPlanInKey();
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
          app.ajax('/SetStopInKeyPlan', data, fn)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })


  },
  //重新查询IM计划
  AgainKrSearch: function (e) {
    let id = e.currentTarget.dataset.id;
    let data = {
      KRPKID: id,
      UserID: app.globalData.PKID,
      UserIPAddress: '',
      RuningPage: 1,
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
        this.SelectPlanInKey();
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
          app.ajax('/AgainKrSearch', data, fn)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

  },
  ViewCharInKeyPlan: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let data = {
      AsinKeyID: id
    }
    let fn = msg => {
      that.changeCanvas();
      let option = {
        color: [],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
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
        series: []
      };

      let yk2 = (JSON.parse(msg.data.d).yk2);
      let data2 = JSON.parse(msg.data.d).data2;
      let ykeys2 = JSON.parse(msg.data.d).ykeys2;
      let color2 = JSON.parse(msg.data.d).color2;
      option.color = color2;
      for (var i = 0; i < ykeys2.length; i++) {
        option.legend.data[i] = ykeys2[i] + ":" + yk2[i];
        var seriesChild = {
          name: ykeys2[i] + ":" + yk2[i],
          type: 'line',

          data: []
        }
        option.series.push(seriesChild);
      }
      var l1 = option.series.length;
      var l2 = option.legend.data.length;
      var l3 = data.length;
      for (var j = 0; j < data2.length; j++) {
        var temp = JSON.parse(data2[j]);
        var con = 1;
        for (var o in temp) { //大的for循环里面的小循环遍历一条数据里面的东西，，每次大循环都会使con=1
          if (con == 1) {
            var x = temp[o]; //遍历键相当于get(key)
            option.xAxis.data.push(x);
            con++;
          } else {
            var y = temp[o];
            option.series[con - 2].data.push(y);
            con++;
          }
        }
      }
      // console.log(option)
      that.init(option)
    }
    app.ajax('/ViewCharInKeyPlan', data, fn)
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