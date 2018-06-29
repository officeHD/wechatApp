import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './A.less'

export default class A extends Component {

  componentWillMount() {
    // console.log(this.props)
  }

  componentDidMount() {
    // console.log(Taro)
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    console.log(nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <View className={`${this.props.index == 1 ? 'active' : ''} item`}>
          <View className="cloud">  注册 </View>
          <View>  可得红包60元 </View>
        </View>
        <View className={`${this.props.index == 2 ? 'active' : ''} item`}>
          <View className="cloud"> 完善  </View>
          <View>  可得积分80 </View>
        </View>
        <View className={`${this.props.index == 3 ? 'active' : ''} item`}>
          <View className="cloud"> 体验出单 </View>
          <View> 可得红包60元  </View>
        </View>
      </View>
    )
  }
}