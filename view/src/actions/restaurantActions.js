import {
    SET_RESTAURANT,
    DEL_RESTAURANT,
    SET_CATEGORIES,
    SET_MENU,
} from './actionTypes';

export const setRestaurant = restaurant => {
    return {
        type: SET_RESTAURANT,
        restaurant
    };
};

export const delRestaurant = () => {
    return {
        type: DEL_RESTAURANT,
    };
};

export const setCategories = categories => {
    return {
        type: SET_CATEGORIES,
        categories
    };
};

export const setMenu = menu => {
    return {
        type: SET_MENU,
        menu
    };
};

export const getRestaurant = restaurantId => {
    const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
    return dispatch => (fetch(api + "/api/restaurant/get",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': restaurantId,
            }),
        }
    ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                dispatch(setRestaurant(data.restaurant));
            } else {
                alert(data.message);
            }
        })
    )
}


export const getAdminRestaurant = user_id => {
    const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
    return dispatch => (fetch(api + "/api/restaurant/getByOwnerID",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': user_id,
            }),
        }
    ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                dispatch(setRestaurant(data.restaurant));
            } else {
                alert(data.message);
            }
        })
        )
}

async function getCategories(restaurant_id) {
    const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
    const response = await fetch(api + "/api/restaurant/category/get",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': restaurant_id,
            }),
        }
    );
    const data = await response.json();
    if (data.code === 200) {
        return data.menu_item;
    } else {
        return [];
    }
}

async function getMenuHelper(restaurant_id, dispatch) {
    const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
    const categories = await getCategories(restaurant_id);
    fetch(api + "/api/restaurant/menu/getSorted",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': restaurant_id,
            }),
        }
    ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                const menu = [];
                const category_index = {};
                categories.map((category, index) => {
                    menu.push({ ...category, menu: [] });
                    category_index[category.name] = index;
                });
                const menu_item = data.menu_item;
                menu_item.map((item, index) => {
                    menu[category_index[item.category]].menu.push(item);
                });
                dispatch(setMenu(menu));
            } else {
                alert(data.message);
            }
        })
}

export const getMenu = (restaurant_id) => {
    return dispatch => (getMenuHelper(restaurant_id, dispatch))
}



