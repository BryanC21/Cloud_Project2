import React, { Component } from "react";
import { Nav, NavDropdown } from 'react-bootstrap';
import SSO from '../sso/sso';
import { connect } from 'react-redux';
import store from "../../store";
import { setUser } from "../../actions/userActions";
import { isEmpty } from "../utils";
import { createUrl } from "../utils";

class NavUser extends Component {
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

    handleLogout() {
        sessionStorage.setItem("token", "");
        store.dispatch(setUser({}));
    }

    render() {
        const user = this.props.user;
        return (
            <>

                {
                    user == null || isEmpty(user) ?
                        <>
                            <SSO
                                show={this.state.modalShow}
                                onHide={() => this.setState({ modalShow: false })}
                                setModalShow={this.setModalShow}
                            />
                            <Nav.Link className='text-danger' onClick={() => this.setModalShow(true)}>Login</Nav.Link>
                        </>
                        :
                        <NavDropdown title={user.firstName} id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>*/}
                            {this.props.orders
                                ?
                                <NavDropdown.Item href={createUrl("/restaurant/user_order")}>Your Order</NavDropdown.Item>
                                :
                                <></>
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#" onClick={() => this.handleLogout()}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                }
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(NavUser);


