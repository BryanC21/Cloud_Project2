import React, { Fragment } from "react";
import { ListGroup, Col } from "react-bootstrap";
import { connect } from 'react-redux';

class CategoryList extends React.Component {
    render() {
        const data = this.props.menu;
        return (
            <Col className="position-fixed category-list">
                <ListGroup variant="flush">
                    <ListGroup.Item className="mb-2">
                        Menu
                    </ListGroup.Item>
                    {data.length ?
                        data.map((item, index) => (
                            <Fragment key={`${item}~${index}`}>
                                <ListGroup.Item className="mb-2">
                                    <a className='text-decoration-none text-dark h4' href={'#category_' + index}>{item.name}</a>
                                </ListGroup.Item>
                            </Fragment>
                        ))
                        : (
                            <p>No items in cart</p>
                        )
                    }
                </ListGroup>
            </Col>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        menu: store.restaurantState.menu,
    }
}

export default connect(mapStateToProps)(CategoryList);
