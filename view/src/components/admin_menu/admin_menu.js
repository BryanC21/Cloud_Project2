import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import Item from '../admin_menu/item';
import Category from '../admin_menu/category';
import { connect } from 'react-redux';

class AdminMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
        };
        this.getMenu = this.getMenu.bind(this);
    }

    async componentDidMount() {
        await this.getCategories();
        await this.getMenu();
    }

    async getCategories() {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        const response = await fetch(api + "/api/restaurant/category/get",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.props.restaurant.id,
                    token: this.props.user.token,
                }),
            }
        );
        const data = await response.json();
        if (data.code === 200) {
            this.setState({ categories: data.menu_item });
        } else {
            alert(data.message);
        }
    }

    async getMenu() {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        const response = await fetch(api + "/api/restaurant/menu/getSorted",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.props.restaurant.id,
                    token: this.props.user.token,
                }),
            }
        );
        const data = await response.json();
        if (data.code === 200) {
            const menu = data.menu_item;
            const item_list = {};
            const items = [];
            await menu.map((item, index) => {
                if (!(item.id in item_list)) {
                    item_list[item.id] = item;
                }
                const cur = item_list[item.id];
                if (!("categories" in cur)) {
                    cur.categories = [];
                }
                if (!(item.category in cur.categories)) {
                    cur.categories.push(item.category);
                }
            });
            await Object.keys(item_list).forEach(function (key, index) {
                items.push(item_list[key]);
            });
            this.setState({ items: items, loading: false });
        } else {
            alert(data.message);
        }
    }
//    <Container className="mb-5">
//    <h2>Categories</h2>
//    <Category data={this.state.categories} />
//</Container>
    render() {
        return (
            <>
                <AdminNav />
                <br/>
                <Container className="mb-5">
                    <h2>Items</h2>
                    <Item items={this.state.items} getMenu={this.getMenu} />
                </Container>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
        restaurant: store.restaurantState.restaurant,
    };
};

export default connect(mapStateToProps)(AdminMenu);