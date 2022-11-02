import React, { Component } from 'react';
import img1 from "../../assets/img/fried_chicken.webp"
import img2 from "../../assets/img/burger.jfif"
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [
                {
                    "name": 'Fried Chicken',
                    "price": 5,
                    "img": img1,
                },
                {
                    "name": 'Burger',
                    "price": 10,
                    "img": img2,
                }
            ],
        }
    }
    render() {
        const { cart } = this.state;
        return (
            <main className="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <div className="items-body">

                    {cart.length ?
                        cart.map((item, index) => (
                            <div className="row cart-item" key={index}>
                                <div className="col-md-3">
                                    <img className="img-fluid" src={item.img} alt={item.img} /></div>
                                <div className="col-md-3 col-sm-3 col-xs-3 col-3" style={{ "padding": '2%' }}>
                                    <h5 className="text-style-1">{item.name}</h5>
                                    <p className="text-style-2">${item.price}</p>

                                    {/* counter button  */}
                                    <div className="wrapper">
                                        <span className="minus">-</span>
                                        <span className="num">01</span>
                                        <span className="plus">+</span>
                                    </div>

                                </div>
                                <div className="col-md-2 col-sm-3 col-xs-3 col-3" style={{ "padding": '2%' }}>
                                    <h5 className="text-style-2">Tenure</h5>
                                    <p className="text-style-3">12 Months</p>
                                </div>
                                <div className="col-md-2 col-sm-3 col-xs-3 col-3" style={{ "padding": '2%' }}>
                                    <h5 className="text-style-2">Tenure</h5>
                                    <p className="text-style-3">Rs 799</p><small style={{ "color": '#3dbdb6' }}>Fully refundable</small>
                                </div>
                                <div className="col-md-2 col-sm-3 col-xs-3 col-3" style={{ "padding": '2%' }}>
                                    <h5 className="text-style-2">Total</h5>
                                    <p className="text-style-4">Rs 1499</p>
                                </div>
                            </div>
                        ))
                        : (
                            <p>No items in cart</p>
                        )
                    }



                    <div className="row container py-4">
                        <div className="col-7 col-md-7 col-lg-8 col-xl-8 col-xxl-7"><a href="/" className="btn btn-primary custom-btn" type="button">CONTINUE SHOPPING</a></div>
                        <div className="col help-text">
                            <h5>Need help ?&nbsp;</h5>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Cart;