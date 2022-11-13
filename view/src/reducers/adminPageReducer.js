import {
    SET_ADMIN_PAGE,
} from '../actions/actionTypes';

const initialState = {
    page: "main",
};

const setAdminPage = (state, action) => {
    return { ...state, page: action.page };
};

const adminPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN_PAGE: return setAdminPage(state, action);
        default: return state;
    }
};

export default adminPageReducer;
