import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './main/main';
import Admin from './admin/admin';
import RestaurantMain from './restaurant/restaurant_main';
import { getUser } from '../actions/userActions';
import store from '../store';
import { connect } from 'react-redux';
import { isEmpty } from './utils';
import CheckoutPage from './checkout/checkout_page';

class routes extends Component {
    componentDidMount() {
        if (isEmpty(this.props.user)) {
            const token = sessionStorage.getItem("token");
            store.dispatch(getUser(token));
        }
    }

    render() {
        return (
            <Routes>
                {this.props.user && this.props.user.level === 'admin' ?
                    <>
                        <Route exact path="/" element={<Admin />} />
                    </>
                    :
                    <>
                        <Route exact path="/" element={<RestaurantMain />} />
                        <Route exact path="/restaurant" element={<Main />} />
                        <Route exact path="/restaurant/checkout" element={<CheckoutPage />} />
                    </>
                }
            </Routes>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(routes); 