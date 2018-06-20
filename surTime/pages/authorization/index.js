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
       
    },
    getUserInfoAction(res){
      let that = this;
      const encryptedData = res.detail.encryptedData;
      const iv = res.detail.iv;
   
      console.log(res);
    },
    
  })