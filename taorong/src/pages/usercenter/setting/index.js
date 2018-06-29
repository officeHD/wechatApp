import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
 
import '../index.less'

@connect(({ account }) => ({
  account
}))
export default class UserMes extends Component {
  config = {
    navigationBarTitleText: '个人信息'
  }

  state = {
    loginByPD: 1

  }

  componentWillMount() { console.log('page willmount'); }
  componentDidMount() { console.log(this.props); }
  componentWillReceiveProps(nextProps) { console.log(this.props, nextProps); }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }

  goto = () => {
    Taro.navigateTo({
      url: '/pages/register/index'
    })
  }
  codeLogin = () => {
    this.setState({
      loginByPD: !this.state.loginByPD
    })
  }

  render() {

    return (
      <View className='user'>
         
        
       
        更多设置
        <View className='userOrder title_item mt20'>
          <View className="icon_title"><Text className="iconfont icon-seting">  </Text>设置</View>
          <View className="allOrder"><Text className="iconfont icon-arrow_right">  </Text></View>
        </View>
      </View>
    )
  }
}