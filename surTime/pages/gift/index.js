// pages/gift/index.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geturl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let fn=msg=>{
      if (msg.data.result.toString() === "1") {
        let geturl = msg.data.getUrl;
        that.setData({
          geturl: geturl 
        })
      }
    }
    app.api("/getUrl", {}, fn)
  },

  lottery:function(){
    let url = this.data.geturl;
    let fn=msg=>{
      console.log(msg)
    }
    app.api(url, {}, fn)
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})