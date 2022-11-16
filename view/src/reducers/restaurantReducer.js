import {
    SET_RESTAURANT,
    DEL_RESTAURANT,
    SET_CATEGORIES,
    SET_MENU,
    SET_DEFAULT_USER_ID,
} from '../actions/actionTypes';

const initialState = {
    restaurant: {},
    categories: {},
    menu: {},
    defaultUserId: -1,
};

const setRestaurant = (state, action) => {
    return { ...state, restaurant: action.restaurant };
};

const setCategories = (state, action) => {
    return { ...state, categories: action.categories };
};

const setMenu = (state, action) => {
    return { ...state, menu: action.menu };
};

const delRestaurant = (state, action) => {
    return {...state, restaurant: {} };
};

const setDefaultUserId = (state, action) => {
    return { ...state, defaultUserId: action.id };
};

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESTAURANT: return setRestaurant(state, action);
        case DEL_RESTAURANT: return delRestaurant(state, action);
        case SET_CATEGORIES: return setCategories(state, action);
        case SET_MENU: return setMenu(state, action);
        case SET_DEFAULT_USER_ID: return setDefaultUserId(state, action);
        default: return state;
    }
};

export default restaurantReducer;
