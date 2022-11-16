import React, { Component } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavUser from '../nav/nav_user';
import { connect } from 'react-redux';
import { setMainPage } from "../../actions/pageActions";
import store from "../../store";
import { createUrl } from "../utils";

class TopNav extends Component {
    handleRedirect(page) {
        store.dispatch(setMainPage(page));
    }
 
    render() {
        const restaurant = this.props.restaurant;
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href={createUrl("/restaurant")} onClick={() => this.handleRedirect("main")}>
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
                            <Nav.Link href={createUrl("/restaurant")}>Menu</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                        </Nav>

                        <Nav>
                            <NavUser orders={true}/>
                            <Nav.Link href={createUrl("/restaurant/checkout")}>Cart{this.props.count > 0 ? "(" + this.props.count + ")" : ""}</Nav.Link>
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
        count: store.orderState.count,
    }
}

export default connect(mapStateToProps)(TopNav);
