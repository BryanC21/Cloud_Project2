import React from 'react';
import { Row, Container } from "react-bootstrap";
import CategoryList from '../main/category_list';
import Menu from '../main/menu';
import RestaurantNav from '../nav/restaurant_nav';
import RestaurantList from '../restaurant/restaurant_list';
import restaurants from '../data/restaurants'

class RestaurantMain extends React.Component {
    render() {
        return (
            <>
                <RestaurantNav user={this.props.user} setUser={this.props.setUser} />
                <br />

                <Container>
                    <RestaurantList data={restaurants} />
                </Container>
                <br />
            </>
        );
    }
}

export default RestaurantMain;