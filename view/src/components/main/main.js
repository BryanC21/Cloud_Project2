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

    //async componentDidMount() {
    //    const searchParams = new URLSearchParams(document.location.search);
    //    await store.dispatch(getRestaurant(searchParams.get('id')));
    //    this.setState({ loading: false });
    //}

    handleRedirect() {
        switch (this.props.mainPage) {
            case "main": return (
                <>
                <CategoryList />
                    <Row className='justify-content-end'>
                        <Menu />
                    </Row>
                </>);
            case "checkout": return <CheckoutPage />;
        }
    }

    render() {
        //if (this.state.loading) {
        //    return <h1>Loading...</h1>;
        //}
        return (
            <>
                <TopNav />
                <br />
                <Container>
                    { this.handleRedirect()}
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
