import React, { Component } from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavUser from "../nav/nav_user";

class RestaurantNav extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="/">Four Guys</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Restaurant</Nav.Link>
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

export default RestaurantNav;
