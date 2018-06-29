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
                申请专业代理人
      </View>
        )
    }
}