import React, { Component, Fragment } from 'react';
import { Container, Row } from "react-bootstrap";
import Restaurant from "../restaurant/restaurant";

class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        }
        this.getRestaurants();
    }
    getRestaurants() {
        const api = process.env.API || "http://192.168.56.1:4080"
        fetch(api + "/api/restaurant/getAll",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    this.setState({ restaurants: data.restaurants });
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
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
