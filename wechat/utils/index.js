let request, response;
//1.用户登录 发送code获取 openId
request = { code: '' };
response = {
  result: '',
  openId: ''
};

//2.根据openID获取用户信息 （是否首次访问 是否关注公众号 绑定的手机号 ）
request = { openId: '' };
response = {
  result: '',
  data: {
    isFirst: '',//是否首次访问
    isFollow: '',//是否关注公众号
    phone: '' //绑定的手机号

  }
}
//3.获取集卡状态 
request = { openId: '' };
response = {
  result: '',
  data: {
    drawTimes: '',//可抽奖次数
    finishNum: '',//目前集齐人数
    cardNum: '',//集齐的花卡总张数
    cardStatus: '',//是否集齐
    cardDetail: {//每张卡的数量
      card1: 1,
      card2: 1,
      card3: 1,
      card4: 1,
      card5: 1,
      card6: 1,
    }
  }
}

//4.首次抽奖 获取验证码

request = { phoneNum: '', openId: '' };
response = {
  result: '',
  message: ''
}
//5.绑定手机号
request = { phoneNum: '', openId: '', mesCode: '' };
response = {
  result: '',
  message: '',
}
//6.点击抽奖 获取抽奖结果
request = { openId: '' };
response = {
  result: '',
  data: {
    rank: '',//排名
    award: '',//奖品
  }
}
//7.好友助力
request = {
  orginOopenId: '',//好友oPenId
  avatarUrl: '',//用户头像
  nickName: '' //用户昵称
};
response = {
  result: '',
  message: ''
}

//8.好友助力结果
request = { openId: '' };
response = {
  result: '',
  list: [{
    id: '',
    avatarUrl: '',//好友头像
    nickName: '',//好友昵称
  }]
}

//9.我的奖品
response = {
  result: '',
  data: {
    isfinish: '',//是否集齐
    rank: '',//排名
    award: '',//奖品
  }
}
//10.省市接口
// 省
response = {
  result: '',
  list: [
    {
      no: 340000,
      name: '安徽省'
    }
  ],
}
//市
response = {
  result: '',
  list: [
    {
      no: 340000,
      name: '合肥市'
    }
  ],
}

//11.提交收货信息
request = {
  openId: '',
  name: '',//收货姓名
  phone: '',//收货手机号
  province: { //收货地址
    no: '',
    name: ''
  },
  city: {
    no: '',
    name: ''
  },
  area: ''//收货详细地址
};
response = {
  result: '',
  message: '',
}




