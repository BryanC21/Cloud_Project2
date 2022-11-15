import {
    SET_USER,
} from '../actions/actionTypes';

const initialState = {
    user: {}
};

const setUser = (state, action) => {
    return { ...state, user: action.user };
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: return setUser(state, action);
        default: return state;
    }
};

export default userReducer;
