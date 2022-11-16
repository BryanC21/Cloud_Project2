import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import SSO from '../sso/sso';
import { connect } from 'react-redux';
import { setMainPage } from "../../actions/pageActions";
import store from "../../store";

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
    handleRedirect(page) {
        store.dispatch(setMainPage(page));
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
                        setModalShow={this.setModalShow }
                    />
                    <Navbar.Brand href="#" onClick={() => this.handleRedirect("main")}>
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
                            <Nav.Link href="#" onClick={() => this.handleRedirect("main")}>Menu</Nav.Link>
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
                            <Nav.Link href="#" onClick={()=>this.handleRedirect("checkout")}>Cart{this.props.order.length > 0 ? "(" + this.props.order.length + ")" : ""}</Nav.Link>
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
        order: store.orderState.order,
    }
}

export default connect(mapStateToProps)(TopNav);
