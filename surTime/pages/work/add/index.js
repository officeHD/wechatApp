// pages/work/add/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    tempFilePaths1: [],
    tempFilePaths2: [],
    partnerArr: [],
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    items: [
      { name: 'personal', value: '个人', checked: 'true' },
      { name: 'company', value: '企业' }
    ],
    genre: 'personal',//company
    type: '2',
    today: '',
    Birthday: '请选择',
    TaskName: '',
    CompanyName: '',
    Name: '',
    Birthday: '',
    Email: '',
    Address: '',
    ZipCode: '',
    AFrontShopLink: '',
    UserCode: '',
    sirenorqiye: '',
    bankname: '',
    bankusercode: '',
    bankuser: '',
    bankhao: '',
    sbankname: '',
    sbankcity: '',
    bankusertel: '',
    bankhao: '',
    Phone: '',
    Userpinyin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var myDate = new Date();
    this.setData({
      type: options.type,
      today: `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`
    })
    console.log(`${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`)

  },
  radioChange: function (e) {

    let val = e.detail.value;
    this.setData({
      genre: val
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
  },
  changeTaskName: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      TaskName: value
    })
  },
  changeName: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Name: value
    })
  },

  changeBirthday: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Birthday: value
    })
  },
  changeUserCode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      UserCode: value
    })
  },


  changeAddress: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Address: value
    })
  },

  changeZipCode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      ZipCode: value
    })
  },
  changeEmail: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Email: value
    })
  }, changePhone: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Phone: value
    })
  }, changeAFrontShopLink: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      AFrontShopLink: value
    })
  }, changeASellsProducts: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      ASellsProducts: value
    })
  },
  changebankname: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      bankname: value
    })
  },
  changesbankcity: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      sbankcity: value
    })
  },
  changesbankname: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      sbankname: value
    })
  },
  changebankuser: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      bankuser: value
    })
  },
  changebankhao: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      bankhao: value
    })
  },
  changebankusertel: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      bankusertel: value
    })
  },
  changeCompanyName: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      CompanyName: value
    })
  },
  changeUserpinyin: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      Userpinyin: value
    })
  },
  changebankusercode: function (e) {
    let value = e.detail.value;
    let that = this;
    that.setData({
      bankusercode: value
    })
  },
  // 保存个人P卡业务
  SavePByUser: function () {
    if (!this.data.TaskName){
      wx.showToast({
        title: '请输入任务名',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.Name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false;
    }
 
    if (!this.data.UserCode) {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'none'
      })
      return false;
    }
 
    if (!this.data.Userpinyin) {
      wx.showToast({
        title: '请输入姓名拼音',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.Phone) {
      wx.showToast({
        title: '请输入手机号', icon: 'none'
      })
      return false;
    }
    if (!this.data.Email) {
      wx.showToast({
        title: '请输入邮箱', icon: 'none'
      })
      return false;
    }
   
    if (!this.data.Birthday) {
      wx.showToast({
        title: '请输入生日', icon: 'none'
      })
      return false;
    }
    if (!this.data.ZipCode) {
      wx.showToast({
        title: '请输入邮编', icon: 'none'
      })
      return false;
    }

   
    if (!this.data.Address) {
      wx.showToast({
        title: '请输地址', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankname) {
      wx.showToast({
        title: '请输入银行名称', icon: 'none'
      })
      return false;
    }
    if (!this.data.sbankcity) {
      wx.showToast({
        title: '请输入支行城市', icon: 'none'
      })
      return false;
    }
    if (!this.data.sbankname) {
      wx.showToast({
        title: '请输入支行名称', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankuser) {
      wx.showToast({
        title: '请输入账户名称', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankhao) {
      wx.showToast({
        title: '请输入银行账号', icon: 'none'
      })
      return false;
    }

    if (!this.data.bankusertel) {
      wx.showToast({
        title: '请输入关联手机号', icon: 'none'
      })
      return false;
    }


    if (!this.data.bankusercode) {
      wx.showToast({
        title: '请输入证件号', icon: 'none'
      })
      return false;
    }
 


    let Pictname = [{
      taskid: this.data.type,
      taskname: this.data.TaskName,
      username: this.data.Name,
      userpinyin: this.data.Userpinyin,
      usercode: this.data.UserCode,
      birthday: this.data.Birthday,
      email: this.data.Email,
      address: this.data.Address,
      addcode: this.data.ZipCode,
      usertel: this.data.Phone,
      bankname: this.data.bankname,
      bankuser: this.data.bankuser,
      bankusercode: this.data.bankusercode,
      bankhao: this.data.bankhao,
      sbankname: this.data.sbankname,
      sbankcity: this.data.sbankcity,
      bankusertel: this.data.bankusertel,
    }];
    let data = {
      UserID: app.globalData.PKID,
      JsonFormInfo: JSON.stringify(Pictname)
    }
    let fn = msg => {
      console.log(msg);
      let res = JSON.parse(msg.data.d);

      wx.showModal({
        title: '提示',
        content: res.ReturnInfo,
      })
    }

    if (app.checkData('任务名', this.data.TaskName) && app.checkData('姓名', this.data.Name)
      && app.checkData('身份证号', this.data.UserCode)
    ) {

      app.ajax("/SavePByUser", data, fn)
    }

  },
  //保存企业P卡业务
  SavePByCompany: function () {
    if (!this.data.TaskName) {
      wx.showToast({
        title: '请输入任务名',
        icon:'none'
      })
      return false;
    }
    if (!this.data.CompanyName) {
      wx.showToast({
        title: '请输入公司名称', icon: 'none'
      })
      return false;
    }

    
    if (!this.data.Name) {
      wx.showToast({
        title: '请输入姓名', icon: 'none'
      })
      return false;
    }



    // if (!this.data.sirenorqiye) {
    //   wx.showToast({
    //     title: '请输入姓名拼音',
    //   })
    //   return false;
    // }
 
   


    if (!this.data.Email) {
      wx.showToast({
        title: '请输入邮箱', icon: 'none'
      })
      return false;
    }
    if (!this.data.Birthday) {
      wx.showToast({
        title: '请输入生日', icon: 'none'
      })
      return false;
    }
    
    if (!this.data.ZipCode) {
      wx.showToast({
        title: '请输入邮编', icon: 'none'
      })
      return false;
    }
    if (!this.data.Address) {
      wx.showToast({
        title: '请输地址', icon: 'none'
      })
      return false;
    }
    if (!this.data.AFrontShopLink) {
      wx.showToast({
        title: '请输入店铺链接', icon: 'none'
      })
      return false;
    }
 
    if (!this.data.sbankname) {
      wx.showToast({
        title: '请输入支行名称', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankuser) {
      wx.showToast({
        title: '请输入账户名称', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankhao) {
      wx.showToast({
        title: '请输入银行账号', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankusertel) {
      wx.showToast({
        title: '请输入关联手机号', icon: 'none'
      })
      return false;
    }
    if (!this.data.bankusercode) {
      wx.showToast({
        title: '请输入证件号', icon: 'none'
      })
      return false;
    }
    let Pictname = [{
      taskid: this.data.type,
      taskname: this.data.TaskName,
      companyname: this.data.CompanyName,
      username: this.data.Name,
      birthday: this.data.Birthday,
      email: this.data.Email,
      address: this.data.Address,
      addcode: this.data.ZipCode,
      StoreLink: this.data.AFrontShopLink,
      sirenorqiye: this.data.sirenorqiye,//
      bankuser: this.data.bankuser,
      bankusercode: this.data.bankusercode,
      bankname: this.data.bankname,

     
    
      bankhao: this.data.bankhao,
      sbankname: this.data.sbankname,
      sbankcity: this.data.sbankcity,
      bankusertel: this.data.bankusertel,
      
    }];
    let data = {
      UserID: app.globalData.PKID,
      JsonFormInfo: JSON.stringify(Pictname)
    }
    let fn = msg => {
      console.log(msg);
      let res = JSON.parse(msg.data.d);

      wx.showModal({
        title: '提示',
        content: res.ReturnInfo,
      })
    }

    app.ajax("/SavePByCompany", data, fn)
  },
  //保存个人/企业WF业务
  WFBillAdd: function () {
    app.ajax("/WFBillAdd", data, fn)
  },
  //增加股东信息
  WFShareholdersAdd: function () {
    app.ajax("/WFShareholdersAdd", data, fn)
  },
  img_item: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          ['tempFilePaths[' + e.target.id + ']']: res.tempFilePaths[0]
        })
      }
    })
  },
  img_item1: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          ['tempFilePaths1[' + e.target.id + ']']: res.tempFilePaths[0]
        })
      }
    })
  },
  img_item2: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          ['tempFilePaths2[' + e.target.id + ']']: res.tempFilePaths[0]
        })
      }
    })
  },


  addPartner: function () {
    var cb = this.data.partnerArr;
    cb.push(this.data.partnerArr.length);
    console.log(cb)
    this.setData({
      partnerArr: cb
    });
  },
  search: function () {

    this.SavePByUser();
  }
})