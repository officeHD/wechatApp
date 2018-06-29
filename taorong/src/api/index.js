import zAJAX from './z-ajax'

//注册
export const register = (state, cb) => {
    zAJAX(`${ctx}/account/register`, { type: state.type, phone:state.phone,code:state.code}, cb)
}
//登录
export const login = (state, cb) => {
    zAJAX(`${ctx}/account/login`, { type: state.type, phone:state.phone,code:state.code}, cb)
}