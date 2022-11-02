import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import AdminMain from '../admin/admin_main';
import ManageRestaurant from '../admin/manage_restaurant';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.restaurant,
        }
        this.setRestaurant = this.setRestaurant.bind(this);
    }
    setRestaurant(restaurant) {
        this.setState({ restaurant, restaurant })
    }

    render() {
        return (
            <>
                { this.state.restaurant ?
                    <>
                        <AdminNav user={this.props.user} restaurant={this.state.restaurant } />
                        <br />

                        <Container>
                            <AdminMain />
                        </Container>
                        <br />
                    </>
                    : 
                    <>
                        <ManageRestaurant user={this.props.user} setRestaurant={this.setRestaurant}  />
                    </>
                }
            </>
        );
    }
}

export default Admin;
