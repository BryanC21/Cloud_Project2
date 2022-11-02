import React, { Fragment } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import Order from "../admin/order"

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            item: { name: 'Error' },
        };
    }

    popup(item) {
        this.setState({ item: item, modalShow: true });
    }

    render() {
        const table = this.props.table;
        return (
            <Card className="mb-5 items-body">
                <Card.Body>
                    <Card.Title>{table.name}</Card.Title>
                    <p className="card-text">Capacity: {table.capacity}</p>
                    Customers: <Form.Control type="number" className="w-25" min="0" defaultValue={table.guest_n}/>
                    <p className="card-text">Status: {table.status}</p>
                    <Row>
                        {
                            table.order && table.order.length ? table.order.map((order, index) => (
                                <Fragment key={`${table}~${index}`}>
                                    <Col xs lg="3">
                                        <Order data={order} />
                                    </Col>
                                </Fragment>
                            )) : null
                        }
                    </Row>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="m-2">Edit Table</Button>
                        {table.status == 'occupied' ?
                            <Button variant="primary" className="m-2">Clear</Button>
                            :
                            <Button variant="primary" className="m-2">Register</Button>
                        }
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Table;
