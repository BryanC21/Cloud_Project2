import {
    SET_ORDER,
    DEL_ORDER,
} from './actionTypes';

export const setOrder = order => {
    sessionStorage.setItem("order", JSON.stringify(order));
    return {
        type: SET_ORDER,
        order,
    };
};

export const delOrder = () => {
    sessionStorage.setItem("order", JSON.stringify([]));
    return {
        type: DEL_ORDER,
    };
};

export const getOrder = () => {
    let order = sessionStorage.getItem("order");
    if (order === null) {
        order = [];
    } else {
        order = JSON.parse(order);
    }
    return dispatch => dispatch(setOrder(order));
}
