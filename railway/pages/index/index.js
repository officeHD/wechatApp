import * as echarts from '../../ec-canvas/echarts';

var app = getApp();

Page({
  data: {
    array: [],
    categories: [],
    series: [{
      name: '成交量2',
      data: []

    }],
    legendData: [],
    xAxisData: [],
    seriesData: [],
    index: 0
  },

  bindPickerChange: function (e) {

    let index = e.detail.value;
    let id = this.data.array[index]['DTU号']
    this.setData({
      index: index,
      id: id
    })
    this.getchartData(id)
  },

  onLoad: function (e) {
    let that = this;
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    that.initChart();


  },
  initChart: function () {
    let that = this;
    wx.request({
      url: 'https://www.starrain00.com/water/waterLevel/getAllPort',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.result == 1) {
          that.setData({
            array: res.data.data
          })
          let port = res.data.data[0]['DTU号'];
          that.getchartData(port);
        }
      }
    });
  },
  getchartData: function (port) {
    let that = this;
    wx.showLoading({
      title: '查询中',
      mask: true
    })
    wx.request({
      url: 'https://www.starrain00.com/water/waterLevel/queryLevleList',
      method: 'POST',
      data: {
        port: port,
        type: 1,
        beginTime: '',
        endTime: '',
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        wx.hideLoading();
        if (res.data.result == 1) {

          let categories = res.data.xList.map((item, index) => {

            if (index == 0 || res.data.xList.length - 1 == index) {
              return item;
            }
            var arr = item.split(' ');
            var lastStr = arr[arr.length - 1];
            return lastStr;
          });
          console.log(categories)
          let series = res.data.dlist.map((item, index) => {

            return { name: item.name, type: 'line', data: item.values }
          });
          let legend = res.data.dlist.map((item, index) => {

            return item.name
          });
          that.setData({
            legendData: legend,
            xAxisData: categories,
            seriesData: series,
          })

          that.setChart();
        }
      }
    })
  }
  ,
  setChart: function () {
    let that = this;

    let option = {
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          var obj = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        },
        extraCssText: 'width: 170px'
      },
      legend: {
        data: that.data.legendData
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '1%',
        containLabel: true
      },
      dataZoom: [
        {
          type: 'slider',
          start: 1,
          end: 30
        }
      ],
      xAxis: {

        boundaryGap: false,
        nameRotate: '90',

        data: that.data.xAxisData
      },
      yAxis: [
        {
          x: 'center', type: 'value',
          min: function (value) {
            return value.min - 0.01;
          },
          max: function (value) {
            return value.max + 0.01;
          },
          axisLabel: {
            formatter: function (value, index) {
              return value.toFixed(3);

            }
          }
        }
      ],
      series: that.data.seriesData,
    };

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

  }

});