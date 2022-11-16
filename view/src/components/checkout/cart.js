import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { setMainPage } from "../../actions/pageActions";
import { setOrder } from "../../actions/orderActions";
import store from "../../store";

class Cart extends Component {
    handleQuantityChange(index, quantity) {
        let temp = JSON.parse(JSON.stringify(this.props.order))
        temp[index].quantity = quantity;
        store.dispatch(setOrder(temp));
    }
    handleRemove(index) {
        let temp = JSON.parse(JSON.stringify(this.props.order))
        temp.splice(index, 1);
        store.dispatch(setOrder(temp));
    }
    handleRedirect(page) {
        store.dispatch(setMainPage(page));
    }

    render() {
        const cart = this.props.order;
        var main_url = new URL(window.location.origin + "/restaurant");
        const searchParams = new URLSearchParams(document.location.search);
        const restaurant_id = searchParams.get('restaurant_id');
        if (restaurant_id) {
            main_url.searchParams.append('restaurant_id', restaurant_id);
        }
        const table_id = searchParams.get('table_id');
        if (table_id) {
            main_url.searchParams.append('table_id', restaurant_id);
        }

        return (
            <main className="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <div className="items-body">

                    {cart.length ?
                        cart.map((item, index) => (
                            <Row className="cart-item d-flex justify-content-between" key={index}>
                                <Col md="3">
                                    <img className="img-fluid" src={item.image} alt={item.image} />
                                </Col>
                                <Col className="pt-4" md="3" sm="3" xs="3">
                                    <Row className="mb-5">
                                        <Col>
                                            <h4>{item.name}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <a className="text-dark" href="#" onClick={()=>this.handleRemove(index)}>Remove</a>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="3" className="d-flex justify-content-end pt-4">
                                    <div className="wrapper">
                                        <span className="minus" onClick={() => this.handleQuantityChange(index, item.quantity-1) }>-</span>
                                        <span className="num">{item.quantity}</span>
                                        <span className="plus" onClick={() => this.handleQuantityChange(index, item.quantity+1)}>+</span>
                                    </div>
                                </Col>
                                <Col md="2" className="d-flex justify-content-end pt-4 pe-4">
                                    <p className="text-style-2 float-right">${item.price * item.quantity}</p>
                                </Col>
                            </Row>
                        ))
                        : (
                            <Container className="cart-item d-flex justify-content-between">
                                <h4>No items in cart</h4>
                            </Container>
                        )
                    }

                    <div className="row container py-4">
                        <div className="col-7 col-md-7 col-lg-8 col-xl-8 col-xxl-7"><a href={main_url.href} className="btn btn-primary custom-btn" type="button">CONTINUE SHOPPING</a></div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = store => {
    return {
        order: store.orderState.order,
    }
}

export default connect(mapStateToProps)(Cart);
