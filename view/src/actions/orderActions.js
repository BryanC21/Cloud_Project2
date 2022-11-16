import {
    SET_ORDER,
} from './actionTypes';

export const setOrder = order => {
    return {
        type: SET_ORDER,
        order,
    };
};

export const getOrder = () => {
    const order = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        ordername: 'Test',
        level: 'order',
    };
    return dispatch => dispatch(setOrder(order));
}

