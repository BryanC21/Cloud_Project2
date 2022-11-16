import {
    SET_ADMIN_PAGE,
    SET_MAIN_PAGE,
} from '../actions/actionTypes';

const initialState = {
    adminPage: "main",
    mainPage: "main",
};

const setAdminPage = (state, action) => {
    return { ...state, adminPage: action.page };
};

const setMainPage = (state, action) => {
    return { ...state, mainPage: action.page };
};

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN_PAGE: return setAdminPage(state, action);
        case SET_MAIN_PAGE: return setMainPage(state, action);
        default: return state;
    }
};

export default pageReducer;
