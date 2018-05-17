// pages/work/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      type: options.type
    })
  },
  checkboxChange: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    if (index === '1') {
      that.setData({
        check1: !that.data.check1
      })
    } else if (index === '2') {
      that.setData({
        check2: !that.data.check2
      })
    } else if (index === '3') {
      that.setData({
        check3: !that.data.check3
      })
    } else if (index === '4') {
      that.setData({
        check4: !that.data.check4
      })
    } else if (index === '5') {
      that.setData({
        check5: !that.data.check5
      })
    }
  }
})