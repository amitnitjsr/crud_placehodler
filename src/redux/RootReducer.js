import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from 'redux-persist'
import BaseReducer from './BaseReducer';
import customer from '../Container/Customer/Reducer';

const rootReducer = {
    baseReducer: BaseReducer,
    customer
}

export const persistConfig = {
    key: 'Project.0.0',
    storage,
    blacklist: [
        'customer',
    ]
}

const appReducer = persistCombineReducers(persistConfig, rootReducer)

const reducer = (state, action) => {
    return appReducer(state, action)
};

export default reducer;