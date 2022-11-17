import React from 'react';
import { Row, Container } from "react-bootstrap";
import CategoryList from '../main/category_list';
import Menu from '../main/menu';
import TopNav from '../nav/nav';
import { getRestaurant } from '../../actions/restaurantActions';
import store from '../../store';
import CheckoutPage from '../checkout/checkout_page';
import { connect } from 'react-redux';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //loading: true,
            reload: 1,
        }
    }

    render() {
        return (
            <>
                <TopNav />
                <br />
                <Container>
                    <CategoryList/>
                    <Row className='justify-content-end'>
                        <Menu />
                    </Row>
                </Container>
                <br />
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        mainPage: store.pageState.mainPage,
    }
}

export default connect(mapStateToProps)(Main);
