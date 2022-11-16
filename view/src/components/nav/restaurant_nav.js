import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import SSO from '../sso/sso';
import { connect } from 'react-redux';
import { isEmpty } from '../utils';

class RestaurantNav extends Component {
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
        console.log(user);
        return (
            <Navbar bg="light" expand="lg" fixed="top">
                <Container fluid>
                    <SSO
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                        setUser={this.props.setUser}
                        setModalShow={this.setModalShow}
                    />
                    <Navbar.Brand href="/">Four Guys</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Restaurant</Nav.Link>
                        </Nav>

                        <Nav>
                            {isEmpty(user) ?
                                <Nav.Link className='text-danger' onClick={() => this.setModalShow(true)}>Login</Nav.Link>
                                :
                                <NavDropdown title={user.firstName} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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
        user: store.userState.user,
    }
}
export default connect(mapStateToProps)(RestaurantNav);
