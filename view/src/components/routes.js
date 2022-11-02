import React, { Component } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './main/main';
import CheckoutPage from './checkout/checkout_page';
import Admin from './admin/admin';
import AdminMenu from './admin_menu/admin_menu';
import RestaurantMain from './restaurant/restaurant_main';
import ManageRestaurant from './admin/manage_restaurant';

class routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //user: null,
            user: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                username: 'Test',
                level: 0,
            },
            //restaurant: null,
            restaurant: {
                name: 'KFC',
                logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png',
                description: 'This is KFC',
                ownerId: 1,
            },
        };
        this.setUser = this.setUser.bind(this);
    }
    setUser(user) {
        this.setState({ user: user });
    }

    render() {
        return (
            <Routes>
                {this.state.user && this.state.user.level === 0 ?
                    <>
                        <Route exact path="/" element={<Admin user={this.state.user} setUser={this.setUser} restaurant={this.state.restaurant }/>} />
                        <Route exact path="/admin-menu" element={<AdminMenu user={this.state.user} setUser={this.setUser} restaurant={this.state.restaurant} />} />
                        <Route exact path="/update-restaurant" element={<ManageRestaurant user={this.state.user} restaurant={this.state.restaurant} />} />
                    </>
                    :
                    <>
                        <Route exact path="/" element={<RestaurantMain user={this.state.user} setUser={this.setUser} />} />
                        <Route exact path="/restaurant" element={<Main user={this.state.user} setUser={this.setUser} />} />
                    </>
                }
                <Route exact path="/checkout" element={<CheckoutPage user={this.state.user} setUser={this.setUser} />} />
            </Routes>
        )
    }
}
export default routes; 