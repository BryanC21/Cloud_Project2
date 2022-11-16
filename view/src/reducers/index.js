import { combineReducers } from 'redux';

import restaurantReducer from './restaurantReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    restaurantState: restaurantReducer,
    userState: userReducer,
    pageState: pageReducer,
    orderState: orderReducer,
});
