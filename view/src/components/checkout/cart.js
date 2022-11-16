import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { setMainPage } from "../../actions/pageActions";
import store from "../../store";

class Cart extends Component {
    handleRedirect(page) {
        store.dispatch(setMainPage(page));
    }

    render() {
        const cart = this.props.order;
        return (
            <main className="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <div className="items-body">

                    {cart.length ?
                        cart.map((item, index) => (
                            <div className="row cart-item" key={index}>
                                <div className="col-md-3">
                                    <img className="img-fluid" src={item.image} alt={item.image} /></div>
                                <div className="col-md-3 col-sm-3 col-xs-3 col-3" style={{ "padding": '2%' }}>
                                    <h5 className="text-style-1">{item.name}</h5>
                                    <p className="text-style-2">${item.price}</p>

                                    {/* counter button  */}
                                    <div className="wrapper">
                                        <span className="minus">-</span>
                                        <span className="num">{item.quantity}</span>
                                        <span className="plus">+</span>
                                    </div>
                                </div>
                            </div>
                        ))
                        : (
                            <Container>
                                <div>No items in cart</div>
                            </Container>
                        )
                    }

                    <div className="row container py-4">
                        <div className="col-7 col-md-7 col-lg-8 col-xl-8 col-xxl-7"><a href="#" className="btn btn-primary custom-btn" type="button" onClick={() => this.handleRedirect("main")}>CONTINUE SHOPPING</a></div>
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
