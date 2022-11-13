import { combineReducers } from 'redux';

import restaurantReducer from './restaurantReducer';
import userReducer from './userReducer';
import adminPageReducer from './adminPageReducer';

export default combineReducers({
    restaurantState: restaurantReducer,
    userState: userReducer,
    adminPageState: adminPageReducer,
});
