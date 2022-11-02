import React, { Fragment } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

class data extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        return (
            <Card className="items-body">
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <p className="card-text">${data.price}</p>
                    <Form.Label>Quantity</Form.Label>
                    <p className="card-text">Status: {data.status}</p>
                    <Form.Control type="number" min="1" defaultValue={data.quantity}/>
                    {data.extra && data.extra.length ? data.extra.map((pref, index) => (
                        <Fragment key={`${pref}~${index}`}>
                            <Form.Group className="mt-2">
                                <Form.Label>{pref.name}</Form.Label>
                                <Form.Select id="pref-select" defaultValue={pref.answer }>
                                    {pref.options && pref.options.length ? pref.options.map((item, index) => (
                                        <Fragment key={`${item}~${index}`}>
                                            <option> {item.name}</option>
                                        </Fragment>
                                    )) : ("")}
                                </Form.Select>
                            </Form.Group>
                        </Fragment>
                    )) : ("")}
                    <Button variant="secondary" className="mt-2 me-2">Edit data</Button>
                    <Button variant="primary" className="mt-2">Complete</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default data;
