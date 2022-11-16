import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './main/main';
import Admin from './admin/admin';
import AdminMenu from './admin_menu/admin_menu';
import RestaurantMain from './restaurant/restaurant_main';
import UserOrder from './user_order/user_order';
import Error from './error/error';
import { getUser } from '../actions/userActions';
import { getRestaurant, getMenu, getAdminRestaurant, getDefaultUserId } from '../actions/restaurantActions';
import { getOrder } from '../actions/orderActions';
import store from '../store';
import { connect } from 'react-redux';
import { isEmpty } from './utils';
import CheckoutPage from './checkout/checkout_page';

class routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: true,
        }
    }

    componentDidMount() {
        if (isEmpty(this.props.user)) {
            const token = sessionStorage.getItem("token");
            store.dispatch(getUser(token));
        }
        if (window.location.href.includes("restaurant")) {
            const searchParams = new URLSearchParams(document.location.search);
            const restaurant_id = searchParams.get('restaurant_id');
            if (restaurant_id == null) {
                this.setState({ error: true });
            }
            if (isEmpty(this.props.restaurant)) {
                store.dispatch(getRestaurant(restaurant_id));
            }
            if (isEmpty(this.props.menu)) {
                store.dispatch(getMenu(restaurant_id));
            }
            if (isEmpty(this.props.order)) {
                store.dispatch(getOrder(restaurant_id));
            }
            if (this.props.defaultUserId == -1) {
                store.dispatch(getDefaultUserId());
            }
        }
        this.setState({ loading: false });
    }

    render() {
        let error = this.state.error;
        if (window.location.href.includes("restaurant") && isEmpty(this.props.restaurant)) {
            error = true;
        }
        if (isEmpty(this.props.restaurant) && this.props.user.level === 'admin') {
            store.dispatch(getAdminRestaurant(this.props.user.id));
        }
        return (
            <Routes>
                {error || this.state.loading
                    ?
                    <>
                        <Route exact path="*" element={<Error />} />
                    </>
                    :
                    <>
                        {
                            this.props.user && this.props.user.level === 'admin' ?
                                <>
                                    <Route exact path="/" element={<Admin />} />
                                    <Route exact path="/admin_menu" element={<AdminMenu />} />
                                </>
                                :
                                <>
                                    <Route exact path="*" element={<RestaurantMain />} />
                                    <Route exact path="/restaurant" element={<Main />} />
                                    <Route exact path="/restaurant/checkout" element={<CheckoutPage />} />
                                    <Route exact path="/restaurant/user_order" element={<UserOrder />} />
                                </>
                        }
                    </>
                }

            </Routes>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
        restaurant: store.restaurantState.restaurant,
        menu: store.restaurantState.menu,
        defaultUserId: store.restaurantState.defaultUserId,
        order: store.orderState.order,
    }
}

export default connect(mapStateToProps)(routes); 