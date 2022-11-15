import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';
import AdminNav from '../nav/admin_nav';
import AdminMain from '../admin/admin_main';
import AdminMenu from '../admin_menu/admin_menu';
import ManageRestaurant from '../admin/manage_restaurant';
import { getAdminRestaurant } from '../../actions/restaurantActions';
import store from '../../store';
import { isEmpty } from '../utils';

class Admin extends Component {
    componentDidMount() {
        if (Object.keys(this.props.restaurant).length === 0 && this.props.user.level === 'admin') {
            store.dispatch(getAdminRestaurant(this.props.user.id));
        }
    }

    handleRedirect() {
        switch (this.props.adminPage) {
            case "main": return <AdminMain />;
            case "menu": return <AdminMenu />;
            case "update_restaurant": return <ManageRestaurant operation="update" />;
        }
    }

    render() {
        console.log(this.props.adminPage);
        return (
            <>
                {isEmpty(this.props.restaurant) ?
                    <>
                        <ManageRestaurant operation="add" />
                    </>
                    :
                    <>
                        <AdminNav />
                        <br />
                        <Container>
                            {this.handleRedirect()}
                        </Container>
                        <br />
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        user: store.userState.user,
        adminPage: store.adminPageState.page,
    }
}

export default connect(mapStateToProps)(Admin);
