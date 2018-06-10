var app = getApp();
Page({
  data: {
    list: [],
    add_show: '',//显示添加模态框
    showipsd: true,
    delBtnWidth: 180//删除按钮宽度单位（rpx）
  },
  onLoad: function () {
    let that = this;
    that.setList();
    that.initEleWidth();
    wx.getStorage({
      key: 'showipsd',
      success: function (res) {
        that.setData({
          showipsd: false
        });
      }
    })
    setTimeout(function(){
      that.setData({
        showipsd:false
      });
      wx.setStorageSync('showipsd', 'false')

    }, 1500)
  },
  changename: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      newName: value
    })
  },
  sure_add: function () {
    let that = this;

    if (that.data.newName) {
      let data = {
        UserID: app.globalData.PKID,
        Pictname: that.data.newName
      }

      app.ajax('/ISPhoto', data, function (res) {
        let mes = JSON.parse(res.data.d)
        if (mes.ReturnInfo === "true") {
          wx.showToast({
            title: '该相册已存在,请更换名称',
            icon: 'none'
          })
        } else {
          let datas = {
            UserID: app.globalData.PKID,
            Pictname: that.data.newName
          }
          wx.showLoading({
            title: '加载中',
          })
          app.ajax('/addpic', datas, function (res) {
            wx.hideLoading()
            let remes = JSON.parse(res.data.d);
            if (remes.State.toString() === "1") {
              wx.showModal({
                title: '提示',
                content: remes.ReturnInfo,
                complete: function () {
                  that.setList();
                  that.changeShow();
                }
              })
            }

          })
        }
      })
    }
  },


  changeShow: function () {
    let that = this;
    this.setData({
      add_show: !that.data.add_show
    });
  },
  //点击删除按钮事件
  delItem: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let Pictname = e.currentTarget.dataset.name;
    let datas = {
      UserID: app.globalData.PKID,
      Pictname: Pictname,
      PictId: id
    }
    wx.showModal({
      title: '提示',
      content: '删除后无法恢复',
      success: function (res) {
        if (res.confirm) {
          app.ajax('/DelPic', datas, function (res) {
            if (JSON.parse(res.data.d).State.toString() === "1") {
              wx.showModal({
                title: '提示',
                content: '删除成功',
                complete: function () {
                  that.setList();
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function (res) { },

    })


  },

  //查看相册
  albumDetail: function (e) {

    let id = e.currentTarget.dataset.id;
    let pictname = encodeURIComponent(e.currentTarget.dataset.pictname);
    wx.navigateTo({
      url: `/pages/album/detail/index?id=${id}&pictname=${pictname}`,
    })
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }

  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  setList: function () {
    let that = this;
    let data = {
      UserID: app.globalData.PKID,
      Picid: 0
    }
    let fn = msg => {
      let res = JSON.parse(msg.data.d);
      console.log(JSON.parse(res.ReturnInfo))
      that.setData({
        list: JSON.parse(res.ReturnInfo).Table1
      })
    }
    app.ajax('/ImageList', data, fn)
  }
})