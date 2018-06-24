var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
   
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that = this;
      if (app.globalData.userInfo) {  
        this.setData({  
          userInfo: app.globalData.userInfo,  
          hasUserInfo: true  
        })  
      } else  {  
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
        // 所以此处加入 callback 以防止这种情况  
        app.userInfoReadyCallback = res => {  
           app.login();
        }  
      } 
      
    },
    getUserInfoAction(res){
      let that = this;
      const encryptedData = res.detail.encryptedData;
      const iv = res.detail.iv;
      if(res.detail.userInfo){
        app.globalData.userInfo=res.detail.userInfo;
        app.login();
      }else{
        
      }
      
    },
    
  })