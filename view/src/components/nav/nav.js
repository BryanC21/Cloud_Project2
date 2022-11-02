import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import SSO from '../sso/sso';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow(show) {
        this.setState({ modalShow: show });
    }

    render() {
        const user = this.props.user;
        const restaurant = this.props.restaurant;
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <SSO
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                        setUser={this.props.setUser}
                        setModalShow={this.setModalShow }
                    />
                    <Navbar.Brand href="#">
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
                            <Nav.Link href="#">Menu</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                        </Nav>

                        <Nav>
                            {user == null ?
                                <Nav.Link className='text-danger' onClick={() => this.setModalShow(true)}>Login</Nav.Link>
                                :
                                <NavDropdown title={user.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="">Log Out</NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Nav.Link href="/checkout">Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default TopNav;
