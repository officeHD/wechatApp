// pages/search/A9/detail/index.js
import * as echarts from '../../../../ec-canvas/echarts';
var app = getApp();
Page({
  data: {
    PkId: '',
    pieData: [],//卖家流量渠道占比
    lineData: [],//折线图数据
    ec: {
      lazyLoad: true
    },
    showChild: false,
    childPIData: '',
    isLoaded: false,
    isDisposed: false,
    tableInfo: {},
    KeywordAnalysis: [],//精准关键词分析 
    active: "SearchTerms",
    chartIndex: 1,
    tableIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let pkid = options.pkid;
    that.setData({
      PkId: pkid
    });
    let UserID = app.globalData.PKID;
    // 获取组件
    that.ecComponent = that.selectComponent('#mychart-dom-bar');
    // 获取A9明细信息
    wx.showLoading({
      title: '加载中',
    });
    app.ajax('/PlannerKeyAllDetail', { UserID: UserID, PkId: pkid, KeyKeywordsRows: 5, RedAnalysisRows: 5 }, function (res) {
      wx.hideLoading();
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      let Tables = JSON.parse(ReturnInfo.ds);
      console.log(Tables);
      if (Tables.reads1.length > 0) {
        //获取饼图数据
        that.GetSourcesStatisticsbyName(UserID, pkid, Tables.reads3[0].StoreName)
      }
      that.setData({
        ASINUrl: ReturnInfo.ASINUrl,//Asin链接:
        KetUrl: ReturnInfo.KeywordUrl,//关键词链接
        ZiAsinCount: ReturnInfo.ChildAsinCount,//子表数量
        tableInfo: Tables.reads[0],//商品基础信息分析
        SourcesStatistics: Tables.reads1,//流量关键词词频分析TOP20
        PIChild: Tables.reads2,//变体所有ASIN信息
        ASINStatisticsByID: Tables.reads3,//关键词入口渠道占比
        KeywordRedAnalysis: Tables.reads4,//当前商品流量关键词分析
        KeywordAnalysis: Tables.reads6,//流量关键词词频分析 
        // OlderPI: Tables.reads1,//历史表
        // RelatedASIN: Tables.reads7,//关联ASIN分析,
      })
    })


    // //获取商品近三个月曝光量、点击量、销量明细
    // app.ajax('/GetHistoryDatabyID', { UserID: UserID, PkId: pkid }, function (res) {
    //   let data = JSON.parse(res.data.d);
    //   let ReturnInfo = JSON.parse(data.ReturnInfo);
    //   that.setData({
    //     lineData: ReturnInfo
    //   })
    //   //折线图
    //   that.setLineChart(ReturnInfo);
    // })



  },

  searchType: function (e) {
    let target = e.currentTarget.dataset.target;
    this.setData({
      active: target
    })
  },
  getPieData: function (e) {
    let UserID = app.globalData.PKID;
    let PkId = this.data.PkId;
    let name = e.currentTarget.dataset.name;
    GetSourcesStatisticsbyName(UserID, PkId, name);
  },
  // 根据店铺名称查询卖家流量渠道占比图形数据
  GetSourcesStatisticsbyName: function (UserID, PkId, StoreName) {
    let that = this;
    app.ajax('/GetTopKeyGraph', { UserID: UserID, PkId: PkId, StoreName: StoreName }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo);
      that.setData({
        pieData: ReturnInfo
      })
      that.setPieChart(that.data.pieData)

    })
  },
  //设置折线图
  setLineChart: function (options) {
    let option = {
      color: ['rgb(124, 181, 236)', 'rgb(67, 67, 72)', 'rgb(144, 237, 125)', 'rgb(247, 163, 92)', 'rgb(128, 133, 233)', 'rgb(241, 92, 128)'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['曝光量', '点击量', '加入购物车量', '订单量', '平均价格', '总销售金额']
      },
      grid: {
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: options.XDay
      },
      yAxis: [
        { x: 'center', type: 'value' }
      ],
      series: [
        { name: '曝光量', type: 'line', smooth: true, data: options.yy1 },
        { name: '点击量', type: 'line', smooth: true, data: options.yy2 },
        { name: '加入购物车量', type: 'line', smooth: true, data: options.yy3 },
        { name: '订单量', type: 'line', smooth: true, data: options.yy4 },
        { name: '平均价格', type: 'line', smooth: true, data: options.yy5 },
        { name: '总销售金额', type: 'line', smooth: true, data: options.yy6 }
      ]
    };
    this.init(option)
  },
  setPieChart: function (options) {
    let data = [];
    if (options.x && options.x.length) {
      for (var i = 0; i < options.x.length; i++) {
        data[data.length] = {
          value: options.y[i], name: options.x[i]
        }
      }
    } else {
      data = [{ value: 1, name: "暂无数据" }]
    }


    let option = {
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
      series: [{
        label: { normal: { ontSize: 14 } },
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    };
    this.init(option)
  },
  setPie2Chart: function (options) {
    let data = [];
    if (options && options.length) {
      for (var i = 0; i < options.length; i++) {
        data[data.length] = {
          value: options[i].KeywordsSourceRate, name: options[i].ASIN
        }
      }
    } else {
      data = [{ value: 1, name: "暂无数据" }]
    }

    let option = {
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
      series: [{
        label: { normal: { ontSize: 14 } },
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    };
    this.init(option)
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

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }
    this.setData({
      isDisposed: true
    });
  },
  viewdetail: function (e) {
    let that = this;
    let ChildPkId = e.currentTarget.dataset.pkid;
    this.GetPIChildbyID(ChildPkId, function (res) {
      let resData = JSON.parse(res.data.d);
      let childPIData = JSON.parse(resData.ReturnInfo)[0];
      console.log(childPIData)
      that.setData({
        childPIData: childPIData,
        showChild: true
      })
    })
  },
  GetPIChildbyID: function (ChildPkId, fn) {
    let data = {
      ChildPkId: ChildPkId,
      UserID: app.globalData.PKID
    }

    app.ajax('/GetPIChildbyID', data, fn)
  },



  prevChart: function (e) {
    let that = this;
    that.setPieChart(that.data.pieData)
    that.setData({
      chartIndex: 1
    })

  },
  nextChart: function (e) {
    let that = this;
    that.setPie2Chart(that.data.ASINStatisticsByID)
    that.setData({
      chartIndex: 2
    })
  },
  prevTable: function (e) {

    let that = this;

    if (that.data.tableIndex > 1) {
      that.setData({
        tableIndex: that.data.tableIndex - 1
      })
    }

  },
  nextTable: function (e) {
    let that = this;

    that.setData({
      tableIndex: that.data.tableIndex + 1
    })
  },
  closeChild: function () {
    this.setData({
      showChild: false
    })
  }




})