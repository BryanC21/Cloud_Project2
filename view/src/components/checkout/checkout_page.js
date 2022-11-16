import React, { Component } from 'react';
import Timeline from '../checkout/timeline';
import Cart from '../checkout/cart';
import Checkout from '../checkout/checkout';
import Info from '../info/info';
import Nav from '../nav/nav';
class CheckoutPage extends Component {
    render() {
        return (
            <>
                <Nav />
                <br />
                <Timeline />
                <div className='container'>
                    <div className='row'>
                        <Cart />
                        <Checkout />
                    </div>
                </div>
                <br />
            </>
        );
    }
}

export default CheckoutPage;