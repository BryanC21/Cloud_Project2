import React, { Fragment } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import OrderItem from "../admin/order_item";

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEdit(status) {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
            fetch(api + "/api/order/update",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: this.props.data.order.id,
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
    }

    render() {
        const data = this.props.data;
        return (
            <Card className="items-body">
                <Card.Body>
                    <p>Order Status: { data.order.status }</p>
                    <p>Order Total: { data.total }</p>
                    <p>Order Items: {data.count}</p>
                    <Row>
                        {
                            data.order_items && data.order_items.length ? data.order_items.map((item, index) => (
                                <Fragment key={`${item}~${index}`}>
                                    <Col xs="12" lg="3" md="3">
                                        <OrderItem data={item} getTables={this.props.getTables} getOrders={this.props.getOrders } />
                                    </Col>
                                </Fragment>
                            )) : <></>
                        }
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="danger" className="mt-2 me-2" onClick={() => this.handleEdit("Cancelled")}>Cancel Order</Button>
                        <Button variant="primary" className="mt-2" onClick={() => this.handleEdit("Completed")}>Complete Order</Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Order;
