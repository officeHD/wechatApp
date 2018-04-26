// pages/search/A9/detail/index.js
import * as echarts from '../../../../ec-canvas/echarts';
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    tableInfo: {},
    active:"SearchTerms"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let pkid = options.pkid;
    let UserID = app.globalData.PKID;
    let that = this;

    //根据子表ChildPkId, 查看A9产品子表信息
    app.ajax('/GetPIChildbyID', { UserID: UserID, ChildPkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo[0])
      that.setData({
        tableInfo: ReturnInfo[0],
        SearchTerms: ReturnInfo[0].SearchTerms.replace(/<br\s*\/?>/g, "\t\n")
      })
      
    })
    //获取商品近三个月曝光量、点击量、销量明细
    app.ajax('/GetHistoryDatabyID', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      // let ReturnInfo = JSON.parse(data.ReturnInfo);
      // console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //关键词入口渠道占比图形数据
    app.ajax('/GetASINStatisticsByID', { UserID: UserID, PkId: pkid }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //获取A9精准关键词分析信息(滚动条)
    app.ajax('/GetKeywordAnalysis', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum:'20' }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //获取A9流量关键词分析信息(滚动条)
    app.ajax('/GetKeywordRedAnalysis', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    //获取A9关联ASIN分析(滚动条)
    app.ajax('/GetPageRelatedASIN', { UserID: UserID, PkId: pkid, PageNum: '1', RowsNum: '20' }, function (res) {
      let data = JSON.parse(res.data.d);
      let ReturnInfo = JSON.parse(data.ReturnInfo);
      console.log(ReturnInfo)
      // that.setData({
      //   tableInfo: ReturnInfo[0]
      // })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  searchType:function(e){
    let target = e.currentTarget.dataset.target;
    this.setData({
      active: target
    })
  }
  
})