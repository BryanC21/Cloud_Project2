import React, { Component, Fragment } from 'react';
import { Container, Row } from "react-bootstrap";
import Restaurant from "../restaurant/restaurant";

class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            loading: true,
        }
        this.getRestaurants();
    }

    async getRestaurants() {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        const response = await fetch(api + "/api/restaurant/getAll",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        if (data.code === 200) {
            this.setState({ restaurants: data.restaurants, loading: false });
        } else {
            alert(data.message);
        }
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>;
        }
        return (
            <>
                <Container>
                    {this.state.restaurants && this.state.restaurants.length ? this.state.restaurants.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                            <Row>
                                <Restaurant data={item} />
                            </Row>
                        </Fragment>
                    ))
                        : <></>
                    }
                </Container>
                <br />
            </>
        );
    }
}

export default RestaurantList;
