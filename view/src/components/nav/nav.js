import React, { Component } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavUser from '../nav/nav_user';
import { connect } from 'react-redux';
import { setMainPage } from "../../actions/pageActions";
import store from "../../store";

class TopNav extends Component {
    handleRedirect(page) {
        store.dispatch(setMainPage(page));
    }
 
    render() {
        const restaurant = this.props.restaurant;
        const searchParams = new URLSearchParams(document.location.search);
        const restaurant_id = searchParams.get('restaurant_id');
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href={" /restaurant?restaurant_id=" + restaurant_id} onClick={() => this.handleRedirect("main")}>
                        <img
                            src={restaurant.logo  }
                            width="30"
                            height="30"
                            className="d-inline-block me-2"
                            alt="React Bootstrap logo"
                        />
                        {restaurant.name}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={"/restaurant?restaurant_id=" + restaurant_id}>Menu</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                        </Nav>

                        <Nav>
                            <NavUser/>
                            <Nav.Link href={"/restaurant/checkout?restaurant_id=" + restaurant_id}>Cart{this.props.count > 0 ? "(" + this.props.count + ")" : ""}</Nav.Link>
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
        order: store.orderState.order,
        count: store.orderState.count,
    }
}

export default connect(mapStateToProps)(TopNav);
