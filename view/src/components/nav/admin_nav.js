import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, Modal, Button, Tab, Tabs, Container, Form } from "react-bootstrap";
import SSO from '../sso/sso';
import { connect } from 'react-redux';
import { isEmpty } from '../utils';
import { setAdminPage } from '../../actions/pageActions';

import store from '../../store';

class AdminNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
    }

    sso() {
        this.setState({ modalShow: true });
    }

    handleRedirect(page) {
        store.dispatch(setAdminPage(page));
    }

    render() {
        const restaurant = this.props.restaurant;
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <SSO
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                    />
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
                            <Nav.Link href="#">Orders</Nav.Link>
                            <Nav.Link href="#">Tables</Nav.Link>
                            <Nav.Link href="#" onClick={() => this.handleRedirect("menu")}>Menu</Nav.Link>
                        </Nav>

                        <Nav>
                            {isEmpty(this.props.user) ?
                                <Nav.Link className='text-danger' onClick={() => this.sso()}>Login</Nav.Link>
                                :
                                <NavDropdown title={this.props.user.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#" onClick={() => this.handleRedirect("update_restaurant")} >Update Restaurant</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="">Log Out</NavDropdown.Item>
                                </NavDropdown>
                            }
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
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(AdminNav);
