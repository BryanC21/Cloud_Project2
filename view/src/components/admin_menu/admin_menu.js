import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import Item from '../admin_menu/item';
import Category from '../admin_menu/category';
import items from "../data/items";
import categories from "../data/categories";

class AdminMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.restaurant,
            items: [],
        }
        this.getMenu();
        this.getMenu = this.getMenu.bind(this);
    }
    getMenu() {
        const api = process.env.API || "http://192.168.56.1:4080"
        fetch(api + "/api/restaurant/menu/getAllForRestaurant",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'restaurant_id': this.state.restaurant.id,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    const items = data.menu_items;
                    this.setState({ items, items });
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        return (
            <>
                <AdminNav user={this.props.user} restaurant={this.state.restaurant} />
                <br />
                <Container className="mb-5">
                    <h2>Categories</h2>
                    <Category data={categories} />
                </Container>
                <Container className="mb-5">
                    <h2>Items</h2>
                    <Item categories={categories} items={this.state.items} restaurant={this.state.restaurant} getMenu={this.getMenu }/>
                </Container>
                <br />
            </>
        );
    }
}

export default AdminMain;