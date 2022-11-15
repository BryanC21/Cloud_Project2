import {
    SET_USER,
} from './actionTypes';

export const setUser = user => {
    return {
        type: SET_USER,
        user,
    };
};

export const getUser = () => {
    const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        username: 'Test',
        level: 'user',
    };
    return dispatch => dispatch(setUser(user));
}

