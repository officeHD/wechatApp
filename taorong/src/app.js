import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
 
import './app.less'

import configStore from './store'

const store = configStore();

class App extends Component {
  config = {
    pages: [
      'pages/usercenter/index',
      'pages/usercenter/apply/index',
      'pages/usercenter/priceInsurance/index',
      'pages/usercenter/remain/index',
      'pages/usercenter/setting/index',
      'pages/usercenter/share/index',
      'pages/usercenter/usermes/index',

      'pages/insurancePolicy/index',
      'pages/order/index',
      'pages/community/index',
      'pages/index/index',
      'pages/login/index',
      'pages/cart/index',
      'pages/register/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#DA251E',
      color:"#A2A2A2",
      list: [{
        pagePath: "pages/index/index",
        iconPath:"./assate/image/index.png",
        selectedIconPath:"./assate/image/index_on.png",
        text: "找产品"
      }, {
        pagePath: "pages/community/index",
        iconPath:"./assate/image/cicle.png",
        selectedIconPath:"./assate/image/cicle_on.png",
        text: "淘融界"
      }, {
        pagePath: "pages/cart/index",
        iconPath:"./assate/image/cart.png",
        selectedIconPath:"./assate/image/cart_on.png",
        text: "购物车"
      }, {
        pagePath: "pages/usercenter/index",
        iconPath:"./assate/image/user.png",
        selectedIconPath:"./assate/image/user_on.png",
        
        text: "个人中心"
      }]
    },

  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))