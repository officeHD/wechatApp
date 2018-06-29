import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import A from '../../components/A/A'

import { changePhone, changeName, changePassWord, changeCode } from '../../actions/account'

import './index.less'
 
@connect(({ account }) => ({
  account
}), (dispatch) => ({
  changeName() {
    dispatch(changeName())
  }, changePhone() {
    dispatch(changePhone())
  },
  changePassWord() {
    dispatch(changePassWord())
  },
  changeCode() {
    dispatch(changeCode())
  }
}))
export default class Login extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loginByPD: 1,
    x: [1, 2]
  }

  componentWillMount() {
    console.log('page willmount');
   

    setTimeout(() => {
      this.setState({
        x: [3, 4]
      })
    }, 2000);

  }

  componentDidMount() {
     
    console.log(this.props);
    
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
      <View className='login'>
        <View className="login_input">

          <Input value={this.props.account.phone} onInput={this.changePhone} className="line" type='text' placeholder={this.state.loginByPD ? '请输入手机号码或邮箱' : '请输入手机号'} focus />
          <View className="flex_between">
            {this.state.loginByPD ?
              <Input value={this.props.account.password} className="flex3" type='password' password placeholder='请输入您的密码' /> :
              <Input value={this.props.account.code} className="flex3" type='text' placeholder='请输入验证码' />
            }
            <View className="red flex1">{this.state.loginByPD ? '' : "获取验证码"}</View >
          </View>

        </View>

        <View className="tr p20">{this.state.loginByPD ? '忘记密码' : ""}</View>
        <button>登录</button>
        <View className="flex_between p20">
          <View>
            还没有账号？<Text className="red" onClick={this.goto}>注册淘融号</Text >
          </View>
          <View className="red" onClick={this.codeLogin}>

            {this.state.loginByPD ? '验证码登录' : "密码登录"}
          </View>
        </View>
      </View>
    )
  }
}