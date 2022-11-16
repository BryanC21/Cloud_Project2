import {
    SET_USER,
} from './actionTypes';

export const setUser = user => {
    return {
        type: SET_USER,
        user,
    };
};

export const getUser = token => {
    //const user = {
    //    id: 1,
    //    firstName: 'John',
    //    lastName: 'Doe',
    //    phone: '1234567890',
    //    username: 'Test',
    //    level: 'admin',
    //};
    const user = {};

    console.log(token);
    const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
    return dispatch => (fetch(api + "/verify",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'token': token,
            }),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 200) {
                const user = {
                    id: data.userinfo[0].id,
                    phone: data.userinfo[0].phone_number,
                    firstName: data.userinfo[0].first_name,
                    lastName: data.userinfo[0].last_name,
                    level: data.userinfo[0].level,
                }
                dispatch(setUser(user));
            } else {
                alert(data.message);
            }
        })
        )
}
