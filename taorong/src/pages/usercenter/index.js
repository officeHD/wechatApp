import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import A from '../../components/A/A'


import './index.less'

@connect(({ account }) => ({
  account
}))
export default class UserCenter extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  state = {


  }

  componentWillMount() { console.log('page willmount'); }
  componentDidMount() { console.log(this.props) }
  componentWillReceiveProps(nextProps) { console.log(this.props, nextProps); }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }

  goto = (url, e) => {
    console.log(url);
    if (!url) {
      Taro.showToast({
        title: '开发中',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    Taro.navigateTo({
      url: url
    })
  }


  render() {

    return (
      <View className='user'>
        <View className='userCard'>
          <View className='card_center'>
            <View className="user_name" onClick={this.goto.bind(this,"/pages/usercenter/usermes/index")}>姓名</View>
            <View onClick={this.goto.bind(this,"/pages/usercenter/usermes/index")}><Text className="bg_clicle">未实名</Text><Text className="bg_clicle">普通会员</Text> </View>
            <View className="agent">不是专业代理><Text className="apply" onClick={this.goto.bind(this,'')}>申请专业代理，轻松拿佣金</Text></View>
            <Image onClick={this.goto.bind(this,"/pages/usercenter/usermes/index")} className="avator" src="http://dummyimage.com/110x110" />
          </View>
        </View>
        <View className='userAccount line'>
          <View className='item' onClick={this.goto.bind(this,'/pages/usercenter/remain/index')}>
            <Text className="red"> 563.00  </Text>
            <Text> 余额 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,'/pages/usercenter/priceInsurance/index')}>
            <Text className="red"> 563.00  </Text>
            <Text> 价保 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="red"> 563  </Text>
            <Text> 积分 </Text>
          </View>
        </View>
        <View className='userInsurance title_item' onClick={this.goto.bind(this,'/pages/insurancePolicy/index')}>

          我的保单 <View className="allOrder">全部订单<Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userAccount line'>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="iconfont icon-safe">  </Text>
            <Text> 保障中 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="iconfont icon-pay_wait">  </Text>
            <Text> 待支付 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="iconfont icon-xufei">  </Text>
            <Text> 待续保 </Text>
          </View>
        </View>
        <View className='userOrder title_item' onClick={this.goto.bind(this,'/pages/order/index')}>
          我的订单
          <View className="allOrder">全部订单<Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userAccount'>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="iconfont icon-status_waiting">  </Text>
            <Text> 待付款 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="iconfont icon-daifahuo">  </Text>
            <Text> 待发货 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,)}>
            <Text className="iconfont icon-daishouhuo">  </Text>
            <Text> 待收货 </Text>
          </View>
          <View className='item' onClick={this.goto.bind(this,'')}>
            <Text className="iconfont icon-services">  </Text>
            <Text> 退货/售后 </Text>
          </View>
        </View>
        <View className='userOrder title_item' onClick={this.goto.bind(this,'')}>
          <View className="icon_title"><Text className="iconfont icon-search">  </Text>保单查询</View>
          <View className="allOrder">身份证号快速查询<Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item' onClick={this.goto.bind(this,'')}>
          <View className="icon_title"><Text className="iconfont icon-claims">  </Text>理赔申请</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item mt20' onClick={this.goto.bind(this,'')}>
          <View className="icon_title"><Text className="iconfont icon-share">  </Text>我的分享</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item ' onClick={this.goto.bind(this,'')}>
          <View className="icon_title"><Text className="iconfont icon-yaoqing">  </Text>邀请伙伴</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item' onClick={this.goto.bind(this,'')}>
          <View className="icon_title"><Text className="iconfont icon-lingdai">  </Text>申请专业代理人</View>
          <View className="allOrder">更高更多奖励<Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item mt20'onClick={this.goto.bind(this,'')}>
          <View className="icon_title"><Text className="iconfont icon-seting">  </Text>设置</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
      </View>
    )
  }
}