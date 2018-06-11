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
    pageNum1: 2,
    pageNum2: 2,
    pageNum3: 2,
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
    app.ajax('/A9ListDetail', { UserID: UserID, PkId: pkid, AnalysisRows: 200, RedAnalysisRows: 200, RelatedRows: 200 }, function (res) {
      wx.hideLoading();
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      let Tables = JSON.parse(ReturnInfo.ds);
      console.log(Tables);
      if (Tables.reads3.length > 0) {
        //获取饼图数据
        that.GetSourcesStatisticsbyName(UserID, pkid, Tables.reads3[0].StoreName)
      }
      that.setData({
        ASINUrl: ReturnInfo.ASINUrl,//Asin链接:
        KetUrl: ReturnInfo.KetUrl,//关键词链接
        ZiAsinCount: ReturnInfo.ZiAsinCount,//子表数量
        tableInfo: Tables.reads[0],//产品主表
        Description: app.convertHtmlToText(Tables.reads[0].Description),
        OlderPI: Tables.reads1,//历史表
        KeywordAnalysis: Tables.reads2,//精准关键词分析 
        SourcesStatistics: Tables.reads3,//卖家流量渠道占比
        // PIChild: Tables.reads4,//产品子表
        ASINStatisticsByID: Tables.reads5,//关键词入口渠道占比
        KeywordRedAnalysis: Tables.reads6,//流量关键词分析
        RelatedASIN: Tables.reads7,//关联ASIN分析,
      })
    })


    //获取商品近三个月曝光量、点击量、销量明细
    app.ajax('/GetHistoryDatabyID', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      that.setData({
        lineData: ReturnInfo
      })
      //折线图
      that.setLineChart(ReturnInfo);
    })

    
    //产品子表
    app.ajax('/GetPIChildAll', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      that.setData({
        PIChild: ReturnInfo
      })
       
    })




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
    app.ajax('/GetSourcesStatisticsbyName', { UserID: UserID, PkId: PkId, StoreName: StoreName }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo);
      that.setData({
        pieData: ReturnInfo
      })

    })
  },
  //设置折线图
  setLineChart: function (options) {
    let option = {

      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['曝光量', '点击量', '加入购物车量', '订单量', '平均价格', '总销售金额']
      },

      grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
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
  //设置饼图
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
    let legendData = data.map((item, index) => {
      return item.name
    })
    let option = {
      backgroundColor: "#ffffff",
      legend: {

        data: legendData
      },

      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [{
        label: {
          normal: {
            ontSize: 12,
            formatter: '   {b|{b}}\n{hr|}\n {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,

            rich: {

              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              per: {

                align: 'center',

              }
            }
          }
        },
        type: 'pie',
        radius: '45%',
        center: ['50%', '65%'],
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
  //设置饼图
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
    let legendData = data.map((item, indedx) => {
      return item.name
    })
    let option = {
      backgroundColor: "#ffffff",
      legend: {

        data: legendData
      },

      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [{

        type: 'pie',
        radius: '45%',
        center: ['50%', '65%'],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        },
        label: {
          normal: {
            ontSize: 12,
            formatter: '   {b|{b}}\n{hr|}\n {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,

            rich: {

              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 13,
                lineHeight: 26,
                align: 'center'
              },
              per: {

                align: 'center',

              }
            }
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
  // 查看详情
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
    if (that.data.chartIndex === 3) {
      that.setPieChart(that.data.pieData)
    } else {
      that.setLineChart(that.data.lineData)
    }
    if (that.data.chartIndex > 1) {
      that.setData({
        chartIndex: that.data.chartIndex - 1
      })
    }

  },
  nextChart: function (e) {
    let that = this;
    if (that.data.chartIndex === 1) {
      that.setPieChart(that.data.pieData)
    } else {
      that.setPie2Chart(that.data.ASINStatisticsByID)
    }
    that.setData({
      chartIndex: that.data.chartIndex + 1
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
  },
  GetKeywordAnalysis: function () {
    let that = this;

    
    let data = {
      UserID: app.globalData.PKID,
      PkId: that.data.PkId,
      PageNum: that.data.pageNum2,
      RowsNum: 200,
    }
    let fn = msg => {
      let data = JSON.parse(msg.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo);
      if (!ReturnInfo || !ReturnInfo.length) {
        return false;
      };

      that.setData({
        KeywordAnalysis: that.data.KeywordAnalysis.concat(ReturnInfo),
        pageNum2: that.data.pageNum2 - 0 + 1
      })
    }
    app.ajax('/GetKeywordAnalysis', data, fn)
  },
  GetKeywordRedAnalysis: function () {
    let that = this;

    let pageNum = that.data.pageNum2;
    let data = {
      UserID: app.globalData.PKID,
      PkId: that.data.PkId,
      PageNum: that.data.pageNum1,
      RowsNum: 200,
    }
    let fn = msg => {
      let data = JSON.parse(msg.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo);
      if (!ReturnInfo || !ReturnInfo.length) {
        return false;
      };

      that.setData({
        KeywordRedAnalysis: that.data.KeywordAnalysis.concat(ReturnInfo),
        pageNum1: that.data.pageNum1 - 0 + 1
      })
    }
    app.ajax('/GetKeywordRedAnalysis', data, fn)
  },
  GetPageRelatedASIN: function () {
    let that = this;

    let pageNum = that.data.pageNum2;
    let data = {
      UserID: app.globalData.PKID,
      PkId: that.data.PkId,
      PageNum: that.data.pageNum3,
      RowsNum: 200,
    }
    let fn = msg => {
      let data = JSON.parse(msg.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo);
      if (!ReturnInfo || !ReturnInfo.length) {
        return false;
      };

      that.setData({
        RelatedASIN: that.data.KeywordAnalysis.concat(ReturnInfo),
        pageNum3: that.data.pageNum3 - 0 + 1
      })
    }
    app.ajax('/GetPageRelatedASIN', data, fn)
  },
  //加载更多
  onReachBottom: function () {
    let that = this;

    if (that.data.tableIndex === 1) {

      that.GetKeywordAnalysis();


    } else if (that.data.tableIndex === 2) {
      that.GetKeywordRedAnalysis()
    } else if (that.data.tableIndex === 3) {
      that.GetPageRelatedASIN();
    }

  },





})