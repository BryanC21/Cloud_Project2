import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const order = this.props.order;
        var total = 0;
        var count = 0;
        order.order_items.forEach(item => {
            total += parseInt(item.price) * item.quantity;
            count += item.quantity;
        })
        order.total = total;
        order.count = count;
        console.log(order);
        return (
            <main>
                <div className="items-body my-3">
                    <Card.Body>
                        <Card.Title>Order Time: {order.order.creation_time.split('.')[0].replace("T", " ")}</Card.Title>
                        <Card.Title>Order Status: {order.order.status}</Card.Title>
                        <Card.Title>Order Items: {order.count}</Card.Title>
                        <Card.Title>Order Total: {order.total}</Card.Title>
                        {order.order_items && order.order_items.length ?
                            order.order_items.map((item, index) => (
                                <Row className="cart-item d-flex justify-content-between" key={index}>
                                    <Col md="3">
                                        <img className="img-fluid" src={item.image} alt={item.image} />
                                    </Col>
                                    <Col className="pt-4" md="3" sm="3" xs="3">
                                        <h4>{item.name}</h4>
                                    </Col>
                                    <Col md="3" className="d-flex justify-content-end pt-4">
                                        <div className="wrapper">
                                            <span className="num">{item.quantity}</span>
                                        </div>
                                    </Col>
                                    <Col md="2" className="d-flex justify-content-end pt-4 pe-4">
                                        <p className="text-style-2 float-right">${item.price * item.quantity}</p>
                                    </Col>
                                </Row>
                            ))
                            : (
                                <Container className="cart-item d-flex justify-content-between">
                                    <h4>No Orders Yet</h4>
                                </Container>
                            )
                        }
                    </Card.Body>


                </div>
            </main>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(Cart);
