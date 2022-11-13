import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Item from "../main/item";
import { getMenu } from '../../actions/restaurantActions';
import store from '../../store';
import { connect } from 'react-redux';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        store.dispatch(getMenu(this.props.restaurant.id, this.props.categories));
    }

    render() {
        return (
            <div className="col-lg-9 pt-5">
                {this.props.menu.length ? this.props.menu.map((categoryItem, index) => (
                    <Fragment key={`${categoryItem}~${index}`}>
                        <Row className='mb-5'>
                            <div><h1 id={"category_" + categoryItem.id}>{categoryItem.name}</h1></div>
                            {categoryItem.menu.length ? categoryItem.menu.map((item, index) => (
                                <Fragment key={`${item}~${index}`}>
                                    <Col xs={12} md={6}>
                                        <Item data={item }/>
                                    </Col>
                                </Fragment>
                            ))
                                : (
                                    <p>No items in cart</p>
                                )}
                        </Row>
                    </Fragment>
                ))
                    : (
                        <p>No items in cart</p>
                    )}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        categories: store.restaurantState.categories,
        menu: store.restaurantState.menu,
    }
}

export default connect(mapStateToProps)(Menu);
