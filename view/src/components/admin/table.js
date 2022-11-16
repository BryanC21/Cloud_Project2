import React, { Fragment } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import Order from "../admin/order"
import { connect } from 'react-redux';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            item: { name: 'Error' },
        };
        this.getOrders();
        this.getOrders = this.getOrders.bind(this);
    }
    getOrders() {
        const orders = [];
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        fetch(api + "/api/order/getAllIncompleteTable",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table_id: this.props.table.id,
                    token: this.props.user.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    for (var i = 0; i < data.orders.length; i++) {
                        var total = 0;
                        var count = 0;
                        var order = data.orders[i];
                        order.order_items.forEach(item => {
                            total += item.price * item.quantity;
                            count += item.quantity;
                        })
                        order.total = total;
                        order.count = count;
                    }
                    orders.push(...data.orders);
                    this.setState({ orders: orders });
                } else {
                    alert(data.message);
                }
            });
        fetch(api + "/api/order/getAllCompleteTable",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table_id: this.props.table.id,
                    token: this.props.user.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    for (var i = 0; i < data.orders.length; i++) {
                        var total = 0;
                        var count = 0;
                        var order = data.orders[i];
                        order.order_items.forEach(item => {
                            total += parseInt(item.price) * item.quantity;
                            count += item.quantity;
                        })
                        order.total = total;
                        order.count = count;
                    }
                    orders.push(...data.orders);
                    this.setState({ orders: orders });
                } else {
                    alert(data.message);
                }
            });
    }
    handleStatusChange(status) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        fetch(api + "/api/restaurant/table/update",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table_id: this.props.table.id,
                    table_name: this.props.table.name,
                    description: this.props.table.description,
                    capacity: this.props.table.capacity,
                    restaurant_id: this.props.table.restaurant_id,
                    table_status: status,
                    token: this.props.user.token,
                }),
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    this.props.getTables();
                } else {
                    alert(data.message);
                }
            })
        if (status === "Archived" && this.props.orders) {
            this.props.orders.foreach(order => {
                fetch(api + "/api/order/update",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            order_id: order.id,
                            status: status,
                        }),
                    }
                )
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 200) {
                            this.props.getTables();
                        } else {
                            alert(data.message);
                        }
                    })
            })
        }
    }

    render() {
        const table = this.props.table;
        const statusMap = {
            In_Use: "In Use",
            Empty: "Empty",
        }
        return (
            <Card className="mb-5 items-body">
                <Card.Body>
                    <Card.Title>{table.name}</Card.Title>
                    <p className="card-text">Capacity: {table.capacity}</p>
                    <p className="card-text">Description: {table.description}</p>
                    <p className="card-text">Table Status: {statusMap[table.status]}</p>
                    {/*<Form.Group>*/}
                    {/*    <Form.Label>Status</Form.Label>*/}
                    {/*    <Form.Select aria-label="Default select example" className="w-25" value={table.status} onChange={(e) => this.handleStatusChange(e)}>*/}
                    {/*        <option value="In_Use">In Use</option>*/}
                    {/*        <option value="Empty">Empty</option>*/}
                    {/*    </Form.Select>*/}
                    {/*</Form.Group>*/}
                    {/*<Form.Label>Customers</Form.Label>*/}
                    {/*<Form.Control type="number" className="w-25" min="0" defaultValue={table.guest_n} />*/}
                        {
                            this.state.orders && this.state.orders.length ? this.state.orders.map((order, index) => (
                                <Fragment key={`${order}~${index}`}>
                                    <Row className="my-3">
                                        <Col>
                                            <Order data={order} getTables={this.props.getTables} getOrders={this.getOrders }/>
                                    </Col>
                                    </Row>
                                </Fragment>
                            )) : null
                        }
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="m-2" onClick={()=>this.props.handleAdd("update", table) }>Edit Table</Button>
                        <Button variant="danger" className="m-2" onClick={()=>this.handleStatusChange("Empty") }>Close Table</Button>
                        <Button variant="primary" className="m-2" onClick={() => this.handleStatusChange("In_Use") }>Open Table</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(Table);
