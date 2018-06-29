import { combineReducers } from 'redux'
import account from './account'
import counter from './counter'

export default combineReducers({
  counter,
  account
})