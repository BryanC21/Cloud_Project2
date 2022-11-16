import {
    SET_ORDER,
    DEL_ORDER,
} from '../actions/actionTypes';

const initialState = {
    order: [],
    count: 0,
    total: 0,
};

const setOrder = (state, action) => {
    let total = 0;
    let count = 0;
    action.order.forEach(item => {
        total += item.quantity * item.price;
        count += item.quantity;
    })
    return { ...state, order: action.order, total: total, count: count };
};

const delOrder = (state, action) => {
    return {...state, order: [], total: 0, count: 0 };
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER: return setOrder(state, action);
        case DEL_ORDER: return delOrder(state, action);
        default: return state;
    }
};

export default orderReducer;
