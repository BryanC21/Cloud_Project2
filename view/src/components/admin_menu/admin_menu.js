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
        }
    }

    render() {
        return (
            <>
                <AdminNav user={this.props.user} restaurant={this.state.restaurant } />
                <br />
                <Container className="mb-5">
                    <h2>Categories</h2>
                    <Category data={categories} />
                </Container>
                <Container className="mb-5">
                    <h2>Items</h2>
                    <Row>
                    {items && items.length ? items.map((item, index) => (
                        <Col xs="12" lg="3">
                            <Item item={item} categories={categories } />
                        </Col>
                    ))
                        : {}
                        }
                    </Row>
                </Container>
                <br />
            </>
        );
    }
}

export default AdminMain;