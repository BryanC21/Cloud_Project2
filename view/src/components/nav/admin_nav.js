import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import NavUser from '../nav/nav_user';
import { connect } from 'react-redux';
import { setAdminPage } from '../../actions/pageActions';
import store from '../../store';

class AdminNav extends Component {
    handleRedirect(page) {
        store.dispatch(setAdminPage(page));
    }

    render() {
        const restaurant = this.props.restaurant;
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            src={restaurant ? restaurant.logo : ''}
                            width="30"
                            height="30"
                            className="d-inline-block me-2"
                            alt="React Bootstrap logo"
                        />
                        {restaurant ? restaurant.name : ''}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Orders</Nav.Link>
                            <Nav.Link href="/admin_menu">Menu</Nav.Link>
                        </Nav>

                        <Nav>
                            <NavUser/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
    };
};

export default connect(mapStateToProps)(AdminNav);
