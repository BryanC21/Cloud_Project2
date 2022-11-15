import React, { Component } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Main from './main/main';
import CheckoutPage from './checkout/checkout_page';
import Admin from './admin/admin';
import AdminMenu from './admin_menu/admin_menu';
import RestaurantMain from './restaurant/restaurant_main';
import ManageRestaurant from './admin/manage_restaurant';
import { getUser } from '../actions/userActions';
import store from '../store';
import { connect } from 'react-redux';
import { isEmpty } from './utils';

class routes extends Component {
    componentDidMount() {
        if (isEmpty(this.props.user)) {
            store.dispatch(getUser());
        }
    }

    async autoSignIn() {
        const token = sessionStorage.getItem("token");
        const sso_url = process.env.SSO_URL || "https://oyygn6heb6.execute-api.us-west-1.amazonaws.com/prod/";
        const sso_key = process.env.SSO_KEY || "U3T0Z9LBfY3S8ml1w7amnm20GIwy0kF75MjeXA2i";

        fetch(sso_url + "/verify",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': sso_key,
                },
                body: JSON.stringify({
                    'token': token,
                }),
            }
        )
            .then((response) => response.json().then(data => ({ status: response.status, body: data })))
            .then(async (data) => {
                if (data.status === 200) {
                    const user = {
                        id: data.body.data.data.id,
                        phone: data.body.data.data.mobile_number,
                        username: data.body.data.data.username,
                        firstName: data.body.data.data.first_name,
                        lastName: data.body.data.data.last_name,
                        level: data.body.data.data.level,
                    }
                    this.setUser(user);
                } else {
                    console.log(data.body.message);
                }
            });
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
                        <Route exact path="/restaurant" element={<Main user={this.props.user} setUser={this.setUser} />} />
                    </>
                }
                <Route exact path="/checkout" element={<CheckoutPage user={this.props.user} setUser={this.setUser} />} />
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