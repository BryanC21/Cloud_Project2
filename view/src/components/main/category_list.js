import React, { Fragment } from "react";
import { ListGroup, Col } from "react-bootstrap";

class CategoryList extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <Col sm className="position-fixed">
                <ListGroup variant="flush">
                    <ListGroup.Item className="mb-2">
                        Menu
                    </ListGroup.Item>
                    {data.length ?
                        data.map((item, index) => (
                            <Fragment key={`${item}~${index}`}>
                                <ListGroup.Item className="mb-2">
                                    <a className='text-decoration-none text-dark h4' href={'#category_' + item.id}>{item.name}</a>
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

export default CategoryList;
