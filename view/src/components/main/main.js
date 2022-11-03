import React from 'react';
import { Row, Container } from "react-bootstrap";
import CategoryList from '../main/category_list';
import Menu from '../main/menu';
import TopNav from '../nav/nav';
import categories from '../data/categories'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: {},
        }
        this.getRestaurant();
    }

    getRestaurant() {
        const searchParams = new URLSearchParams(document.location.search);
        const restaurantId = searchParams.get('id');
        const api = process.env.API || "http://192.168.56.1:4080"
        fetch(api + "/api/restaurant/get",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': restaurantId,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    this.setState({ restaurant: data.restaurant });
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        return (
            <>
                <TopNav user={this.props.user} setUser={this.props.setUser} restaurant={this.state.restaurant} />
                <br />

                <Container>
                    <CategoryList data={categories} />
                    <Row className='justify-content-end'>
                        <Menu data={categories} />
                    </Row>
                </Container>
                <br />
            </>
        );
    }
}

export default Main;