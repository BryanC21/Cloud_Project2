import {
    SET_ADMIN_PAGE,
    SET_MAIN_PAGE,
} from './actionTypes';

export const setAdminPage = page => {
    return {
        type: SET_ADMIN_PAGE,
        page
    };
};

export const setMainPage = page => {
    return {
        type: SET_MAIN_PAGE,
        page
    };
};
