import React from 'react';
import { Row, Container } from "react-bootstrap";
import CategoryList from '../main/category_list';
import Menu from '../main/menu';
import TopNav from '../nav/nav';
import { getRestaurant } from '../../actions/restaurantActions';
import store from '../../store';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        const searchParams = new URLSearchParams(document.location.search);
        await store.dispatch(getRestaurant(searchParams.get('id')));
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>;
        }
        return (
            <>
                <TopNav />
                <br />

                <Container>
                    <CategoryList />
                    <Row className='justify-content-end'>
                        <Menu />
                    </Row>
                </Container>
                <br />
            </>
        );
    }
}

export default Main;