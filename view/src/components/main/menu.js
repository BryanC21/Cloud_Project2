import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Item from "../main/item";
import { connect } from 'react-redux';

class Menu extends React.Component {
    render() {
        return (
            <div className="col-lg-9 pt-5">
                {this.props.menu.length ? this.props.menu.map((categoryItem, index) => (
                    <Fragment key={`${categoryItem}~${index}`}>
                        <Row className='mb-5'>
                            <div><h1 id={"category_" + index}>{categoryItem.name}</h1></div>
                            {categoryItem.menu.length ? categoryItem.menu.map((item, index) => (
                                <Fragment key={`${item}~${index}`}>
                                    <Col xs={12} md={6}>
                                        <Item data={item} />
                                    </Col>
                                </Fragment>
                            ))
                                : (
                                    <p>No items in menu</p>
                                )}
                        </Row>
                    </Fragment>
                ))
                    : (
                        <p>No items in categories</p>
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
