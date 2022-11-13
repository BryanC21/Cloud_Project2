import {
    SET_ADMIN_PAGE,
} from './actionTypes';

export const setAdminPage = page => {
    return {
        type: SET_ADMIN_PAGE,
        page
    };
};
