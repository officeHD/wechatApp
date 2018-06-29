import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
 
import '../index.less'

@connect(({ account }) => ({
  account
}))
export default class UserMes extends Component {
  config = {
    navigationBarTitleText: '余额'
  }

  state = {

  }

  componentWillMount() { console.log('page willmount'); }
  componentDidMount() { console.log(this.props); }
  componentWillReceiveProps(nextProps) { console.log(this.props, nextProps); }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }


  render() {

    return (
      <View className='user'>
         
        
       
        <View className='userOrder title_item'>
          <View className="icon_title"><Text className="iconfont icon-search">  </Text>保单查询</View>
          <View className="allOrder">身份证号快速查询<Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item'>
          <View className="icon_title"><Text className="iconfont icon-claims">  </Text>理赔申请</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item mt20'>
          <View className="icon_title"><Text className="iconfont icon-share">  </Text>我的分享</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item '>
          <View className="icon_title"><Text className="iconfont icon-yaoqing">  </Text>邀请伙伴</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item'>
          <View className="icon_title"><Text className="iconfont icon-lingdai">  </Text>申请专业代理人</View>
          <View className="allOrder">更高更多奖励<Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
        <View className='userOrder title_item mt20'>
          <View className="icon_title"><Text className="iconfont icon-seting">  </Text>设置</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
      </View>
    )
  }
}