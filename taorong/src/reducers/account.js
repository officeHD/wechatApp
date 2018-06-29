import { CHANGE_NAME, CHANGE_PHONE, CHANGE_PASSWORD, CHANGE_CODE } from '../actions/account'

const INITIAL_STATE = {
    name: '',
    password: '',
    phone: '',
    code: '',

}

export default function counter(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: action.val
            }


        case CHANGE_PHONE:
            return {
                ...state,
                phone: action.val
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.val
            }
        case CHANGE_CODE:
            return {
                ...state,
                code: action.val
            }
        default:
            return state
    }
}