import {
    SET_ORDER,
    DEL_ORDER,
} from '../actions/actionTypes';

const initialState = {
    order: [],
};

const setOrder = (state, action) => {
    return { ...state, order: action.order };
};

const delOrder = (state, action) => {
    return {...state, order: {} };
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER: return setOrder(state, action);
        case DEL_ORDER: return delOrder(state, action);
        default: return state;
    }
};

export default orderReducer;
