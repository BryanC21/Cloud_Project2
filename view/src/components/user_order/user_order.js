import React, { Component } from 'react';
import Timeline from '../checkout/timeline';
import OrderList from '../user_order/order_list';
import Nav from '../nav/nav';
import { connect } from 'react-redux';

class UserOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getOrders();
    }
    getOrders() {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        fetch(api + "/api/order/getAllUser",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.props.user.id,
                    token: this.props.user.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    this.setState({ orders: data.orders });
                }
            })
    }
    render() {
        const orders = this.state.orders;
        return (
            <>
                <Nav />
                <br />
                <section className="container">
                    <div className="timeline-box">
                        <h3>My Order</h3>
                    </div>
                </section>
                <br />
                <div className='container'>
                    {orders && orders.length ?
                        orders.map((order, index) => (
                            <div className='row'>
                                <OrderList order={order } />
                            </div>
                        ))
                        :
                        <></>
                    }
                    <div className="row container py-4">
                        <div className="col-7 col-md-7 col-lg-8 col-xl-8 col-xxl-7"><a href="#" className="btn btn-primary custom-btn" type="button" onClick={() => this.handleRedirect("main")}>CONTINUE SHOPPING</a></div>
                    </div>
                </div>

                <br />
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(UserOrder);
