import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import A from '../../components/A/A'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loginByPD:1,
   
  }

  componentWillMount() {
    console.log('page willmount')
   
  }

  componentDidMount() {
    console.log('page didmount');
    console.log(Taro.getEnv())
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);

  }

  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() {

  }

  goto = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }
  codeLogin = () => {
    this.setState({
      loginByPD: !this.state.loginByPD
    })
  }

  render() {

    return (
      <View className='login'>
        <A  index={1} />
        <View className="login_input">

          <Input className="line" type='text' placeholder="请输入您的姓名"/>
          <Input className="line" type='text' placeholder="请输入手机号"/>
          <View className="flex_between">
            <Input className="flex3" type='password' placeholder="请输入验证码" />
            <View className="red flex1">获取验证码</View >
          </View>

        </View>

         
        <button>免费注册</button>
        <View className="flex_between p20">
          <View>
            注册即视为同意<Text className="red" onClick={this.goto}>《淘融e点注册协议》</Text >
          </View>
          <View className="red" onClick={this.goto}>
            
             账号登录
          </View>
        </View>
      </View>
    )
  }
}