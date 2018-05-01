// pages/search/A9/detail/index.js
import * as echarts from '../../../../ec-canvas/echarts';



var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    tableInfo: {},
    active: "SearchTerms",
    chart1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let pkid = options.pkid;
    let UserID = app.globalData.PKID;
    let that = this;
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');

    // 获取A9明细信息
    wx.showLoading({
      title: '加载中',
    });
    app.ajax('/A9ListDetail', { UserID: UserID, PkId: pkid, AnalysisRows: 10, RedAnalysisRows: 10, RelatedRows: 10 }, function (res) {
      wx.hideLoading();
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      let Tables = JSON.parse(ReturnInfo.ds);
      console.log(Tables)
      that.setData({
        ASINUrl: ReturnInfo.ASINUrl,//Asin链接:
        KetUrl: ReturnInfo.KetUrl,//关键词链接
        ZiAsinCount: ReturnInfo.ZiAsinCount,//子表数量
        tableInfo: Tables.reads[0],//产品主表
        OlderPI: Tables.reads1,//历史表
        KeywordAnalysis: Tables.reads2,//精准关键词分析 
        SourcesStatistics: Tables.reads3,//卖家流量渠道占比
        PIChild: Tables.reads4,//产品子表
        ASINStatisticsByID: Tables.reads5,//关键词入口渠道占比
        KeywordRedAnalysis: Tables.reads6,//流量关键词分析
        RelatedASIN: Tables.reads7,//关联ASIN分析,
       
      })
    })
    // 根据用户编号和A9主表编号，获取A9产品信息子表top10（变体所有ASIN信息（默认显示））
    app.ajax('/GetPIChild', { UserID: UserID, PkId: pkid }, function (res) {

    })

    // 根据用户编号和A9主表编号，获取A9产品所有信息子表（变体所有ASIN信息（展开全部））
    // app.ajax('/GetPIChildAll', { UserID: UserID, PkId: pkid }, function (res) {
    //   let data = JSON.parse(res.data.d);
    //   let ReturnInfo = JSON.parse(data.ReturnInfo);
    //   console.log(ReturnInfo[0])
    //   that.setData({
    //      tableInfo: ReturnInfo[0]

    //   })

    // })
    // 根据用户编号，A9主表编号和页数，获取A9产品信息子表（变体所有ASIN信息（显示更多））
    app.ajax('/GetPIChildbyPage', { UserID: UserID, PkId: pkid, PageNum: 20 }, function (res) {


    })


    //获取商品近三个月曝光量、点击量、销量明细
    app.ajax('/GetHistoryDatabyID', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);

      that.setData({
        chart1: ReturnInfo
      })
      that.init(ReturnInfo);
    })
    //关键词入口渠道占比图形数据
    app.ajax('/GetASINStatisticsByID', { UserID: UserID, PkId: pkid }, function (res) {

    })
    //获取A9精准关键词分析信息(滚动条)
    app.ajax('/GetKeywordAnalysis', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {

    })
    //获取A9流量关键词分析信息(滚动条)
    app.ajax('/GetKeywordRedAnalysis', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {

    })
    //获取A9关联ASIN分析(滚动条)
    app.ajax('/GetPageRelatedASIN', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {

    })

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  searchType: function (e) {
    let target = e.currentTarget.dataset.target;
    this.setData({
      active: target
    })
  },
  // 点击按钮后初始化图表
  init: function (options) {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
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
          {
            x: 'center',
            type: 'value'
          }
        ],
        series: [
          {
            name: '曝光量',
            type: 'line',
            smooth: true,
            data: options.yy1
          },
          {
            name: '点击量',
            type: 'line',
            smooth: true,
            data: options.yy2
          },
          {
            name: '加入购物车量',
            type: 'line',
            smooth: true,
            data: options.yy3
          }, {
            name: '订单量',
            type: 'line',
            smooth: true,
            data: options.yy4
          }, {
            name: '平均价格',
            type: 'line',
            smooth: true,
            data: options.yy5
          }, {
            name: '总销售金额',
            type: 'line',
            smooth: true,
            data: options.yy6
          }
        ]
      };
      chart.setOption(option)

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
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
    wx.navigateTo({
      url: '/pages/webview/index?url=' + e.currentTarget.dataset.url,
    })
  }

})