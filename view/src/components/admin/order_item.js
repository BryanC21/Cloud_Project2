import React, { Fragment } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { connect } from 'react-redux';

class OrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }
    }

    handleEdit() {
        if (this.state.edit) {
            var item = {
                order_item_id: this.props.data.order_item_id,
                status: this.props.data.status,
                quantity: document.getElementById("item_quantity").value,
            }
            this.handleUpdate(item);
        }
        this.setState({ edit: !this.state.edit });
    }

    handleComplete() {
        var item = {
            order_item_id: this.props.data.order_item_id,
            status: "Completed",
            quantity: this.props.data.quantity,
        }
        this.handleUpdate(item);
    }

    handleUpdate(item) {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        fetch(api + "/api/order/item/update",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    this.props.getOrders();
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        const data = this.props.data;
        return (
            <Card className="items-body">
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <p className="card-text">${data.price}</p>
                    {this.state.edit
                        ?
                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control id="item_quantity" type="number" min="1" defaultValue={data.quantity} />
                        </Form.Group>
                        :
                        <p className="card-text">Quantity: {data.quantity}</p>

                    }

                    <p className="card-text">Status: {data.status}</p>
                    {/*{data.extra && data.extra.length ? data.order_items.map((pref, index) => (*/}
                    {/*    <Fragment key={`${pref}~${index}`}>*/}
                    {/*        <Form.Group className="mt-2">*/}
                    {/*            <Form.Label>{pref.name}</Form.Label>*/}
                    {/*            <Form.Select id="pref-select" defaultValue={pref.answer }>*/}
                    {/*                {pref.options && pref.options.length ? pref.options.map((item, index) => (*/}
                    {/*                    <Fragment key={`${item}~${index}`}>*/}
                    {/*                        <option> {item.name}</option>*/}
                    {/*                    </Fragment>*/}
                    {/*                )) : ("")}*/}
                    {/*            </Form.Select>*/}
                    {/*        </Form.Group>*/}
                    {/*    </Fragment>*/}
                    {/*)) : ("")}*/}
                    {this.state.edit
                        ?
                        <Button variant="primary" className="mt-2 me-2" onClick={() => this.handleEdit()}>Save</Button>
                        :
                        <Button variant="secondary" className="mt-2 me-2" onClick={() => this.handleEdit()}>Edit Order</Button>
                    }
                    <Button variant="primary" className="mt-2" onClick={() => this.handleComplete()}>Complete Order</Button>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(OrderItem);
