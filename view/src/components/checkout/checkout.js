import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import store from "../../store";
import { delOrder } from "../../actions/orderActions";

class Checkout extends Component {
    handleOrder() {
        const searchParams = new URLSearchParams(document.location.search);
        var table_id = searchParams.get('table_id');
        var user_id = this.props.user ? this.props.user.id : this.props.defaultUserId;

        if (!table_id) {
            console.log(this.props.restaurant);
            table_id = this.props.restaurant.pickup.id;
        }
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        fetch(api + "/api/order/make",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: this.props.restaurant.id,
                    table_id: table_id,
                    user_id: user_id,
                    status: "Waiting",
                    order_items: this.props.order,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    alert("Order Placed");
                    store.dispatch(delOrder());
                    window.location.href=window.location.href.replace("/checkout", ""); 
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        return (
            <>
                <aside className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div className="items-body container" style={{ padding: "10%" }}>
                        <div className="promo-box">
                            {this.props.count}
                            {this.props.count > 1
                                ? 
                                " items"
                                : 
                                " item"
                            }
                        </div>
                        <br />
                        <div className="row payment">
                            <div className="col-7 col-xxl-7">
                                <h4 className="text-style-2">Subtotal</h4>
                            </div>
                            <div className="col">
                                <h4 className="text-style-3 text-end">${this.props.total}</h4>
                            </div>
                        </div>
                        <div className="row payment">
                            <div className="col-7 col-xxl-7">
                                <h4 className="text-style-2">Tax</h4>
                            </div>
                            <div className="col">
                                <h4 className="text-style-3 text-end">$0</h4>
                            </div>
                        </div>
                        <hr />
                        <div className="row payment">
                            <div className="col-7 col-xxl-7">
                                <h4 className="text-style-1">Total</h4>
                            </div>
                            <div className="col">
                                <h4 className="text-style-1 text-end">${this.props.total}</h4>
                            </div>
                        </div>
                        <br />
                        <div className="row container">
                            <button
                                className="btn custom-btn-fill"
                                onClick={() => this.handleOrder()}
                                type="button"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </aside>
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
        restaurant: store.restaurantState.restaurant,
        defaultUserId: store.restaurantState.defaultUserId,
        order: store.orderState.order,
        total: store.orderState.total,
        count: store.orderState.count,
    }
}

export default connect(mapStateToProps)(Checkout);
