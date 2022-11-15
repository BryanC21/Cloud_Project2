import React from 'react';
import { Container } from "react-bootstrap";
import RestaurantNav from '../nav/restaurant_nav';
import RestaurantList from '../restaurant/restaurant_list';

class RestaurantMain extends React.Component {
    render() {
        return (
            <>
                <RestaurantNav user={this.props.user} setUser={this.props.setUser} />
                <br />

                <Container>
                    <RestaurantList />
                </Container>
                <br />
            </>
        );
    }
}

export default RestaurantMain;