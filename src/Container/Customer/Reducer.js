import * as types from './ActionTypes';

const initialState = {
    customerDetails: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_CUSTOMER:
        case types.DELETE_CUSTOMER:
        case types.EDIT_CUSTOMER:
        case types.UPDATE_CUSTOMER:
            return {
                ...state,
                customerDetails: action.payload,
            }
        default:
            return state
    }
}